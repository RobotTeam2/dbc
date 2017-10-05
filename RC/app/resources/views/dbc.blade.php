<div class="container mt-lg-5">
  <div class="row mt-lg-5 justify-content-center">
    <div class="col-6">
      <form method="POST" class="justify-content-center" action="/uart/speed">
        {{ csrf_field() }}
        <input id="ex1" class="form-control" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
        <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_up</i></button>
      </form>
    </div>
  </div>
</div>

<div class="container mt-lg-5">
  <div class="row mt-lg-5 justify-content-center">
    <div class="col-6">
      <div class="row align-items-start justify-content-center">
        <form method="POST" class="justify-content-center" action="/uart/forword">
          {{ csrf_field() }}
          <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_up</i></button>
        </form>
      </div>
      <div class="row align-items-center justify-content-center">
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
      <div class="row align-items-end justify-content-center">
        <form method="POST" action="/uart/back">
          {{ csrf_field() }}
          <button type="submit" class="btn btn-lg btn-success"><i class="material-icons">keyboard_arrow_down</i></button>
        </form>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  $('#ex1').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
</script>


