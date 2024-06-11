<!DOCTYPE html>
<html>
<head>
    <title>Laravel 10 Generate PDF Example - ItSolutionStuff.com</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
        body {
            font-size: 14px; /* Global font size */
        }
        table.table {
            font-size: 12px; /* Font size for table */
        }
        table.table th, table.table td {
            padding: 5px; /* Reduce padding for table cells */
            text-align: center; /* Center align text */
        }
        table.table th {
            background-color: #f2f2f2; /* Light gray background for headers */
        }
    </style>
</head>
<body>
    <p>{{ $date }}</p>
    <h3>{{ $title }}</h3>

    <table class="table table-bordered">
        <tr>
            <th>Metier</th>
            <th>CIN</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Adress</th>
        </tr>
        <tr>
            <td>Responsable</td>
            <td>{{ $transport->responsable->cin }}</td>
            <td>{{ $transport->responsable->nom }}</td>
            <td>{{ $transport->responsable->prenom }}</td>
            <td>{{ $transport->responsable->email }}</td>
            <td>{{ $transport->responsable->tel }}</td>
            <td>{{ $transport->responsable->adress }}</td>
        </tr>
        <tr>
            <td>Chauffeur</td>
            <td>{{ $transport->chauffeur->cin }}</td>
            <td>{{ $transport->chauffeur->nom }}</td>
            <td>{{ $transport->chauffeur->prenom }}</td>
            <td>{{ $transport->chauffeur->email }}</td>
            <td>{{ $transport->chauffeur->tel }}</td>
            <td>{{ $transport->chauffeur->adress }}</td>
        </tr>
    </table>

    <h4>Liste Des Personnels</h4>
  
    <table class="table table-bordered">
        <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>CIN</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Heur Aller</th>
            <th>Heur Retour</th>
        </tr>
        @foreach($transport->etudiants as $etudiant)
        <tr>
            <td>{{ $etudiant->nom }}</td>
            <td>{{ $etudiant->prenom }}</td>
            <td>{{ $etudiant->cne }}</td>
            <td>{{ $etudiant->adress }}</td>
            <td>{{ $etudiant->tel }}</td>
            <td>{{ $etudiant->heur_aller }}</td>
            <td>{{ $etudiant->heur_retour }}</td>
        </tr>
        @endforeach
    </table>
</body>
</html>
