<div class="container" style="height:10%;"></div>
<div class="container">
  <div class="row">
    <div class="col-sm">
      <form method="POST" action="/uart/forword">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_up</i></button>
      </form>
    </div>
  </div>
  <div class="row" style="height:2%;"></div>
  <div class="row">
    <div class="col-sm">
      <form method="POST" action="/uart/left">
        {{ csrf_field() }}
        <button type="button" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_left</i></button>
      </form>
    </div>
    <div class="col">
      <form method="POST" action="/uart/stop">
        {{ csrf_field() }}
        <button type="button" class="btn btn-lg btn-block btn-danger"><i class="material-icons">stop</i></button>
      </form>
    </div>
    <div class="col">
      <form method="POST" action="/uart/right">
        {{ csrf_field() }}
        <button type="button" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_right</i></button>
      </form>
    </div>
  </div>
  <div class="row" style="height:2%;"></div>
  <div class="row">
    <div class="col-sm">
      <form method="POST" action="/uart/back">
        {{ csrf_field() }}
        <button type="button" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_down</i></button>
      </form>
    </div>
  </div>
</div>


