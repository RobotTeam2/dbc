<div class="container" style="height:10%;"></div>
<div class="container">
  <div class="row">
    <div class="col-sm">
      <form  class="mt-2 mb-2" method="POST" action="/uart/up">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_up</i></button>
      </form>
    </div>
  </div>
  <div class="row" style="height:2%;"></div>
  <div class="row">
    <div class="col-sm">
      <button type="button" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_left</i></button>
    </div>
    <div class="col">
      <button type="button" class="btn btn-lg btn-block btn-danger"><i class="material-icons">stop</i></button>
    </div>
    <div class="col">
      <button type="button" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_right</i></button>
    </div>
  </div>
  <div class="row" style="height:2%;"></div>
  <div class="row">
    <div class="col-sm">
      <button type="button" class="btn btn-lg btn-block btn-success"><i class="material-icons">keyboard_arrow_down</i></button>
    </div>
  </div>
</div>


