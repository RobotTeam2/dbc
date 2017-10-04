<div class="container mt-lg-5">
  <div class="row align-items-start justify-content-center">
    <div class="col-4 justify-content-center">
      <form method="POST" action="/uart/forword">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_up</i></button>
      </form>
    </div>
  </div>
  <div class="row align-items-center justify-content-center">
    <div class="col-4">
      <div class="row">
      <form method="POST" action="/uart/left">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_left</i></button>
      </form>
      <form method="POST" action="/uart/stop">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-danger"><i class="material-icons">stop</i></button>
      </form>
      <form method="POST" action="/uart/right">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_right</i></button>
      </form>
      </div>
    </div>
  </div>
  <div class="row align-items-end justify-content-center">
    <div class="col-4">
      <form method="POST" action="/uart/back">
        {{ csrf_field() }}
        <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_down</i></button>
      </form>
    </div>
  </div>
</div>


