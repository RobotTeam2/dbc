<div class="container mt-lg-5">
  <div class="row mt-lg-5 justify-content-center">
    <div class="col-6">
      <form method="POST" class="justify-content-center" action="/uart/speed">
        {{ csrf_field() }}
        <div class="input-group">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="submit">1-255</button>
          </span>
          <input type="text" class="form-control" name="speed" placeholder="{{ $speed }}"  value="{{ $speed }}" />
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
</script>


