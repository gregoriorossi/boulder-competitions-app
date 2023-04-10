<?php

namespace App\Models\Exports;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class AthletesExport implements 
    FromCollection, 
    WithHeadings,
    WithMapping, 
    WithColumnFormatting,
    ShouldAutoSize,
    WithEvents {
    
    protected $collection;

    public function __construct($collection) {
        $this->collection = $collection;
    }

    public function collection()
    {
        return $this->collection;
    }
  
    public function map($athlete): array
    {
        return [
            $athlete['Surname'],
            $athlete['Name'],
            $athlete['Email'],
            Date::stringToExcel($athlete['BirthDate']),
            ((string)$athlete['Telephone']),
            $this->getGender($athlete['Gender'])
        ];
    }

    public function headings(): array
    {
        return ["Cognome", "Nome", "Email", "Data di Nascita", "Telefono", "Sesso"];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_TEXT,
            'B' => NumberFormat::FORMAT_TEXT,
            'C' => NumberFormat::FORMAT_TEXT,
            'D' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'E' => NumberFormat::FORMAT_GENERAL,
            'F' => NumberFormat::FORMAT_TEXT
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A1:W1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(13);
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setBold(true);
            }
        ];
    }


    private function getGender($gender) {
        return $gender == "MALE" ? "Maschio" : "Femmina";
    }
}