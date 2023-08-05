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
    </style>
</head>
<body>
    <p class="athlete-number col-12 text-right mb-3">
        ATLETA N°......
    </p>

    <div class="intestazione col-12 text-bold mb-3">
        <div class="intestazione-immagine">
            <img src="{{ public_path('teste-di-pietra-logo.png') }}" style="width: 100px; height: 100px">
        </div>
        <div class="intestazione-testo">
            <p >Associazione Sportiva Dilettantistica Teste di Pietra<br/>
            Dichiarazione liberatoria<br/>
            ISCRIZIONE BOULDER MEETING
            </p>
        </div>
    </div>
    <!-- START MINOR --> 
    <div class="col-12 mb-1" style="font-size:1rem">
        <div class="col-6 text-bold">
            Il/La sottoscritto/a:
        </div>
        <div class="col-6 text-right" style="font-style: italic">
            *si prega di scrivere in stampatello
        </div>
    </div>
    <div class="col-12">
        <div class="col-12">
            <div class="col-6">
                Cognome<span class="form-value">{{ $Surname }}</span>
            </div>
            <div class="col-6">
                Nome<span class="form-value">{{ $Name }}</span>
            </div>
        </div>
        <div class="col-12 mb-1">
            <div class="col-6">
                Nato/a a<span class="form-value">{{ $BirthPlace }}</span>
            </div>
            <div class="col-6">
                Prov.<span class="form-value">{{ $BirthProvince }}</span>&nbsp;&nbsp;&nbsp;il
                    <span class="form-value">{{ $BirthDate }}</span>
            </div>
        </div>
        <div class="col-12 mb-1">
            <div class="col-6">
                Residente a<span class="form-value">{{ $AddressCity }}</span>
            </div>
            <div class="col-6">
                Via<span class="form-value">{{ $AddressStreet }}</span>&nbsp;&nbsp;&nbsp;n°
                    <span class="form-value">{{ $AddressNumber }}</span>
            </div>
            <div class="col-6">
                Prov.&nbsp;<span class="form-value">{{ $AddressProvince }}</span>
            </div>
        </div>
    </div>
     <!-- END MINOR --> 

     <!-- START TUTOR --> 
    <div class="col-12 mb-1 text-bold" style="font-size:1rem">
        In qualit&agrave; di tutore/tutrice legale del/della minorenne:
    </div>
    <div class="col-12">
        <div class="col-12">
            <div class="col-6">
                Cognome<span class="form-value">{{ $TutorSurname }}</span>
            </div>
            <div class="col-6">
                Nome<span class="form-value">{{ $TutorName }}</span>
            </div>
        </div>
        <div class="col-12 mb-1">
            <div class="col-6">
                Nato/a a<span class="form-value">{{ $TutorBirthPlace }}</span>
            </div>
            <div class="col-6">
                Prov.<span class="form-value">{{ $TutorBirthProvince }}</span>&nbsp;&nbsp;&nbsp;il
                    <span class="form-value">{{ $TutorBirthDate }}</span>
            </div>
        </div>
        <div class="col-12 mb-1">
            <div class="col-6">
                Residente a<span class="form-value">{{ $TutorAddressCity }}</span>
            </div>
            <div class="col-6">
                Via<span class="form-value">{{ $TutorAddressStreet }}</span>&nbsp;&nbsp;&nbsp;n°
                    <span class="form-value">{{ $TutorAddressNumber }}</span>
            </div>
            <div class="col-6">
                Prov.&nbsp;<span class="form-value">{{ $TutorAddressProvince }}</span>
            </div>
        </div>
        <div class="col-12">
            <div class="col-6">
                Email<span class="form-value">{{ $Email }}</span>
            </div>
            <div class="col-6">
                Telefono<span class="form-value">{{ $Telephone }}</span>
            </div>
        </div>
    </div>
     <!-- END TUTOR --> 


    <div class="col-12 mb-4">
            <p class="text-bold text-center">Dichiara sotto la propria responsabilit&agrave; di:</p>
        <p class="text-justify">
            Essere un arrampicatore esperto e solleva l'associazione A.S.D. Teste di Pietra da qualsiasi responsabilit&agrave; per tutti i danni eventualmente cagionati, a me stesso o a terzi, derivanti dalla mia
        partecipazione all'evento "BOULDER MEETING".
            </p>
            <p  class="text-justify" style="text-decoration:underline;">D.Lgs 30/06/2003 n.196 Tutela delle persone e di altri soggetti rispetto il trattamento dei dati personali.</p>
            <p  class="text-justify">Ai sensi dell&#39;art. 13 del D.Lgs. 196 del 30/06/2003 Vi informiamo che i Vs. dati personalisono e verranno da noi trattati
        ed inseriti in una banca dati, essendoci indispensabile per il corretto svolgimento dei nostrirapporti. Tutti i dati suddetti
        finora raccolti, nonchè quelli che saranno in futuro raccolti verranno trattati sia in forma cartacea che con strumenti
        informatici e/o telematici, in modo lecito e per finalità di legge connessi a norme civilistiche, fiscali, contabili, etc. e
        gestione delrapporto associativo. Informiamo inoltre che il titolare dei dati personali a norma di legge e I&#39;Associazione
        Sportiva Dilettantistica Teste di Pietra con sede in San Quirino (PN) Via S. Eurosia, 32.</p>
    </div>
    <div class="col-12 mb-3">
        <div class="col-6">
            Vivaro, li ..../...../...........
        </div>
        <div class="col-6 text-right">
            Firma: ....................................................
        </div>
    </div>

    <div class="col-12 text-bold text-center mb-1">
        INOLTRE
    </div>
    
    <div class="col-12 mb-3">
        <p class="text-justify mb-1">
        A titolo gratuito, senza limiti di tempo, anche ai sensi degli artt. 10 e 320 cod. civ. e degli artt. 96 e 97 legge 22.4.1941, n.
    633, Legge sul diritto d&rsquo;autore, alla pubblicazione e/o diffusione in qualsiasi forma delle proprie immagini sul sito internet
    della Societ&agrave;/Ente A.S.D. TESTE DI PIETRA ,sui canalisocial istituzionali (Facebook, Twitter, Youtube, ecc...)e/o su qualsiasi
    altro mezzo di diffusione, nonch&eacute; autorizza la conservazione dei video stessi negli archivi informatici della Societ&agrave;/Ente e
    prende atto che la finalit&agrave; di tali pubblicazionisono meramente di carattere informativo ed eventualmente promozionale.
        </p>
        <p class="text-justify">
        La presente liberatoria/autorizzazione potr&agrave; essere revocata in ogni tempo con comunicazione scritta da inviare via
posta comune o e-mail.
        </p>
    </div>
  
    <div class="col-12 mb-4">
        <div class="col-6 text-center">
            <div class="consent-box"></div><span style="line-height:20px">&nbsp;Presto il consenso</span>
        </div>
        <div class="col-6 text-center">
            <div class="consent-box"></div>&nbsp;Nego il consenso
        </div>
    </div>

    <div class="col-12">
        <div class="col-6">
            Vivaro, li ..../...../...........
        </div>
        <div class="col-6 text-right">
            Firma: ....................................................
        </div>
    </div>
</body>
</html>