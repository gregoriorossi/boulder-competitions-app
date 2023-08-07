<!DOCTYPE html>
<html>
<head>
    <title>Teste di Pietra - Liberatoria</title>
    <style>
        body {
            padding-top: 0px:
            font-family: Verdana, Helvetica, sans-serif;
            font-size: 0.8rem;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .text-justify {
            text-align: justify;
        }

        .text-bold {
            font-weight: bold;
        }

        .mb-1 {
            margin-bottom: 10px;
        }

        .mb-2 {
            margin-bottom: 20px;
        }

        .mb-3 {
            margin-bottom: 30px;
        }

        .mb-4 {
            margin-bottom: 40px;
        }

        .athlete-number {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        .intestazione {
            font-size: 1.2rem;
        }

        .intestazione-immagine {
            width: 20%;
            padding-left:10px;
        }

        .intestazione-immagine,
        .intestazione-testo {
            display: inline-block;
        }

        .intestazione-testo {
            width: 70%;
            text-align: center;
            font-size: 1rem;
        }

        .form-row {
            margin-bottom: 10px;
        }

        .form-value {
            margin-left: 10px;
            font-size: 1rem;
        }

        .col-12 {
            width: 100%;
        }

        .col-6 {
            width: 49%;
            display: inline-block;
        }

        .consent-box {
            height: 10px;
            width: 10px;
            border: 1px solid black;
            display: inline-block;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    
    @php
        $athletesNumber = count($athletes);
        $counter = 0;
    @endphp 

    @foreach ($athletes as $athlete)
        @if($athlete["IsMinor"])
            @include('athlete_module_minor', $athlete) 
        @else
            @include('athlete_module', $athlete) 
        @endif

        @if($counter < $athletesNumber-1)
            <div class="page-break"></div>
        @endif

        @php
            $counter++;
        @endphp 
    @endforeach
  
</body>
</html>