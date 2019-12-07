-=>Hello {{$name}}!!!
@foreach ($results as $sample)
    <p>{{ $sample->COC_ID }} {{$sample->Description}} {{$sample->Result}} {{$sample->Chem_ID}}</p>
@endforeach
