<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dual Box Car</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <body>
        @include('dbc')
    
        <div class="container" style="height:10%;"></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 offset-lg-4">
              <form>
                <div class="form-group">
                  <label for="esp-ip-address">ESPボードのIPアドレスを入れてください:</label>
                  <input type="text" class="form-control input-lg" size="30" maxlength="20" id="esp-ip-address" value="127.0.0.1" ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr/>
        <div class="container">
          <div class="row">
            <div class="col-lg-1 offset-lg-5">
              <button type="button" class="btn btn-lg btn-block btn-primary" onclick="forward()"><i class="material-icons">fast_forward</i></button>
            </div>
          </div>
        </div>
        <div class="container" style="height:5%;"></div>
        <hr/>
        <div class="container">
          <div class="row">
            <div class="col-sm-1 offset-sm-5">
              <button type="button" class="btn btn-lg btn-block btn-success" onclick="up()"><i class="material-icons">keyboard_arrow_up</i></button>
            </div>
          </div>
          <div class="row" style="height:2%;"></div>
          <div class="row">
            <div class="col-sm-1 offset-sm-4">
              <button type="button" class="btn btn-lg btn-block btn-success" onclick="left()"><i class="material-icons">keyboard_arrow_left</i></button>
            </div>
            <div class="col-sm-1">
              <button type="button" class="btn btn-lg btn-block btn-danger" onclick="stop()"><i class="material-icons">stop</i></button>
            </div>
            <div class="col-sm-1">
              <button type="button" class="btn btn-lg btn-block btn-success" onclick="right()"><i class="material-icons">keyboard_arrow_right</i></button>
            </div>
          </div>
          <div class="row" style="height:2%;"></div>
          <div class="row">
            <div class="col-sm-1 offset-sm-5">
              <button type="button" class="btn btn-lg btn-block btn-success" onclick="down()"><i class="material-icons">keyboard_arrow_down</i></button>
            </div>
          </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
    </body>
</html>
