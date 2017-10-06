#include <ArduinoJson.h>



const static char MOTER_PWM_FL = 9;
const static char MOTER_TRN_FL = 7;
const static char MOTER_SPD_FL = 8;

const static char MOTER_PWM_FR = 3;
const static char MOTER_TRN_FR = 5;
const static char MOTER_SPD_FR = 4;

const static char MOTER_PWM_BL = 10;
const static char MOTER_TRN_BL = 2;
const static char MOTER_SPD_BL = 6;


const static char MOTER_PWM_BR = 11;
const static char MOTER_TRN_BR = 13;
const static char MOTER_SPD_BR = 12;


#define FL_FF LOW
#define FL_BB HIGH

#define FR_FF HIGH
#define FR_BB LOW

#define BL_FF LOW
#define BL_BB HIGH

#define BR_FF HIGH
#define BR_BB LOW


#define FRONT() { \
  digitalWrite(MOTER_TRN_FL, LOW);\
  digitalWrite(MOTER_TRN_FR, HIGH);\
  digitalWrite(MOTER_TRN_BL, LOW);\
  digitalWrite(MOTER_TRN_BR, HIGH);\
  }


#define BACK() { \
  digitalWrite(MOTER_TRN_FL, HIGH);\
  digitalWrite(MOTER_TRN_FR, LOW);\
  digitalWrite(MOTER_TRN_BL, HIGH);\
  digitalWrite(MOTER_TRN_BR, LOW);\
  }

#define STOP() {\
  analogWrite(MOTER_PWM_FL, 0xff);\
  analogWrite(MOTER_PWM_FR, 0xff);\
  analogWrite(MOTER_PWM_BL, 0xff);\
  analogWrite(MOTER_PWM_BR, 0xff);\
}

void setup()
{
  pinMode(MOTER_PWM_FL, OUTPUT);
  pinMode(MOTER_PWM_FR, OUTPUT);
  pinMode(MOTER_PWM_BL, OUTPUT);
  pinMode(MOTER_PWM_BR, OUTPUT);
  
  pinMode(MOTER_TRN_FL, OUTPUT);
  pinMode(MOTER_TRN_FR, OUTPUT);
  pinMode(MOTER_TRN_BL, OUTPUT);
  pinMode(MOTER_TRN_BR, OUTPUT);

  pinMode(MOTER_SPD_FL, INPUT);
  pinMode(MOTER_SPD_FR, INPUT);
  pinMode(MOTER_SPD_BL, INPUT);
  pinMode(MOTER_SPD_BR, INPUT);


  TCCR1B = TCCR1B & B11111000 | B00000001;
  TCCR2B = TCCR2B & B11111000 | B00000001;

/*
 * stop
*/
  STOP();
/*
 * front
*/
  FRONT();

  analogWrite(MOTER_PWM_FL, 0xcf);  
  analogWrite(MOTER_PWM_FR, 0xcf);
  analogWrite(MOTER_PWM_BL, 0xcf);  
  analogWrite(MOTER_PWM_BR, 0xcf);

//  Serial.begin(9600);
  Serial.begin(115200);

}

int speed = 0xff;
int speed_FL = 0xff;
int speed_FR = 0xff;
int speed_BL = 0xff;
int speed_BR = 0xff;

String InputCommand ="";



static long stopCounter = 0;
static long const iStopTimeoutCounter = 300000L;

#define DUMP_VAR(x)  { \
  Serial.print(__LINE__);\
  Serial.print(":"#x"=<");\
  Serial.print(x);\
  Serial.print(">\n");\
}

#define CONFIRM_WHEEL(name) {\
  DUMP_VAR(motor);\
  DUMP_VAR(spd);\
  DUMP_VAR(front);\
  if(motor == #name) {\
    speed_##name = spd;\
    analogWrite(MOTER_PWM_##name, spd);\
    stopCounter = iStopTimeoutCounter;\
    if(front) {\
      digitalWrite(MOTER_TRN_##name , name##_FF);\
      DUMP_VAR(front);\
    } else {\
      digitalWrite(MOTER_TRN_##name, name##_BB);\
      DUMP_VAR(front);\
    }\
  }\
  DUMP_VAR(stopCounter);\
}

void tryConfirmJson() {  
  StaticJsonBuffer<256> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(InputCommand);
  if (root.success()) {
    InputCommand = "";
    for (JsonObject::iterator it=root.begin(); it!=root.end(); ++it) {
      JsonObject& params = it->value;
      int spd = params["s"];
      int front = params["f"];
      String motor = it->key;
      DUMP_VAR(motor);
      DUMP_VAR(spd);
      DUMP_VAR(front);
      CONFIRM_WHEEL(FL);
      CONFIRM_WHEEL(FR);
      CONFIRM_WHEEL(BL);
      CONFIRM_WHEEL(BR);
    }
  }
}

void run_comand() {
  Serial.print("InputCommand=<");
  Serial.print(InputCommand);
  Serial.print(">\n");
  Serial.print("speed=<");
  Serial.print(speed);
  Serial.print(">\n");
  if(InputCommand=="uu") {
    speed -= 5;
    analogWrite(MOTER_PWM_FL, speed);  
    analogWrite(MOTER_PWM_FR, speed);
    analogWrite(MOTER_PWM_BL, speed);
    analogWrite(MOTER_PWM_BR, speed);
  }
  if(InputCommand=="dd") {
    speed += 5;
    analogWrite(MOTER_PWM_FL, speed);  
    analogWrite(MOTER_PWM_FR, speed);
    analogWrite(MOTER_PWM_BL, speed);
    analogWrite(MOTER_PWM_BR, speed);
  }
  if(InputCommand=="ff") {
    FRONT();
    stopCounter = iStopTimeoutCounter;
  }
  if(InputCommand=="bb") {
    BACK();
    stopCounter = iStopTimeoutCounter;
  }
  if(InputCommand=="ss") {
    speed =0xff;
    analogWrite(MOTER_PWM_FL, speed);  
    analogWrite(MOTER_PWM_FR, speed);
    analogWrite(MOTER_PWM_BL, speed);
    analogWrite(MOTER_PWM_BR, speed);
  }
  if(InputCommand=="gg") {
    speed =0;
    analogWrite(MOTER_PWM_FL, speed);  
    analogWrite(MOTER_PWM_FR, speed);
    analogWrite(MOTER_PWM_BL, speed);
    analogWrite(MOTER_PWM_BR, speed);
  }
}

#define STOP_SPD() { \
  speed =0xff;\
  speed_FL = 0xff;\
  speed_FR = 0xff;\
  speed_BL = 0xff;\
  speed_BR = 0xff;\
}

void loop() {
  // stop
  if(stopCounter-- == 0) {
    STOP_SPD();
    STOP();
    DUMP_VAR(stopCounter);
  }
  if (Serial.available() > 0) {
    char incomingByte = Serial.read();
    Serial.print(incomingByte);
    if(incomingByte =='\n' || incomingByte =='\r') {
      run_comand();
      InputCommand = "";
    } else if(incomingByte =='}') {
      InputCommand += incomingByte;
      tryConfirmJson();
    } else {
      InputCommand += incomingByte;
    }
    if(InputCommand.length() > 256) {
      InputCommand = "";
    }
  }
}
