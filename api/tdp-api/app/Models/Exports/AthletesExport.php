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
            $this->getIsMinor($athlete['IsMinor']),
            $athlete['Email'],
            $this->getGender($athlete['Gender']),
            Date::stringToExcel($athlete['BirthDate']),
            $athlete['BirthPlace'],
            $athlete['BirthProvince'],
            $athlete['AddressCity'],
            $athlete['AddressProvince'],
            $athlete['AddressStreet'] . ', ' . $athlete['AddressNumber'],
            $athlete['TutorSurname'],
            $athlete['TutorName'],
            Date::stringToExcel($athlete['TutorBirthDate']),
            $athlete['TutorBirthPlace'],
            $athlete['TutorBirthProvince'],
            $athlete['TutorAddressCity'],
            $athlete['TutorAddressProvince'],
            $athlete['TutorAddressStreet'] . ', ' . $athlete['TutorAddressNumber'],
            $athlete['TutorTelephone']
        ];
    }

    public function headings(): array
    {
        return [
            "Cognome", // A
            "Nome",  // B
            "Minore",  // C
            "Email",  // D
            "Sesso", // E
            "Data di Nascita", // F
            "Città di nascita", // G
            "Provincia di nascita", // H
            "Città di residenza", // I
            "Provincia di residenza", // J
            "Indirizzo di residenza", // K
            "Cognome Tutor", // L
            "Nome Tutor", // M
            "Data di nascita Tutor", // N
            "Città di nascita Tutor", // O
            "Provincia di nascita Tutor", // P
            "Città di residenza Tutor", // Q
            "Provincia di residenza Tutor", // R
            "Indirizzo di residenza Tutor", // S
            "Telefono Tutor" // T
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_TEXT,
            'B' => NumberFormat::FORMAT_TEXT,
            'C' => NumberFormat::FORMAT_TEXT,
            'D' => NumberFormat::FORMAT_TEXT,
            'E' => NumberFormat::FORMAT_TEXT,
            'F' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'G' => NumberFormat::FORMAT_TEXT,
            'H' => NumberFormat::FORMAT_TEXT,
            'I' => NumberFormat::FORMAT_TEXT,
            'J' => NumberFormat::FORMAT_TEXT,
            'K' => NumberFormat::FORMAT_TEXT,
            'L' => NumberFormat::FORMAT_TEXT,
            'M' => NumberFormat::FORMAT_TEXT,
            'N' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'O' => NumberFormat::FORMAT_TEXT,
            'P' => NumberFormat::FORMAT_TEXT,
            'Q' => NumberFormat::FORMAT_TEXT,
            'R' => NumberFormat::FORMAT_TEXT,
            'S' => NumberFormat::FORMAT_TEXT,
            'T' => NumberFormat::FORMAT_GENERAL
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

    private function getIsMinor($isMinor) {
        return $isMinor ? "Sì" : "NO";
    }
}