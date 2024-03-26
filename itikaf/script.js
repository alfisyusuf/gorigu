var employeesData = {
    "Boarding": ["Aghna Rizqia Salsabilla", "Aidah Mubatillah Al Khumsaa", "Alifuddin Yusuf Adisuseno", "Ardia Veriana Saputri", "Ayu Lestari", "BU MULYANI", "Fatimah", "Fitriya Az zahroh,S.Pd", "Galang Ma'ruf", "Giant Ramadhan Syah", "Hasbina Khoiriyah", "Hidayah Zulirakani, S.Pd.", "Imam Aji Cahyono", "Khoirul Arsyad Abdullah", "Lu'lu' Rosyidah Rofifah", "Luthfiyah Miftahur Ramdhani", "M Hanif Aditya", "Mahmud Al Ghoziri", "Miftahul Arkhan", "Muh Ihsan, S.Pd.", "Muh. Bisri Mustofa", "Muhammad Syafiq", "Muhammad Syihabuddin Annur,S.Pd.", "MUHAMMAD ABDULLAH FAUZAN", "Mutiara Nurani Suci S.Pd", "Qonita", "Rino Saputra", "Siti Sholikhatun", "Tursila", "Zahrotul Khasanah", "Ziat Rahman Hakim", "Firda Azaria", "Luthfia Shifaul Amanah Burhani ", "Aidah ", "Ammar Zain Marzuqi", "Balqis Sakhaa Ilafi", "Melinda Retno Diningrum", "Itsna Rachmawati Dewi"],
    "SD": ["Karyawan 1", "Karyawan 2", "Karyawan 3"],
    "SMP": ["Karyawan 4", "Karyawan 5", "Karyawan 6"],
    "SMA": ["Karyawan 7", "Karyawan 8", "Karyawan 9"]
};

var unitSelect = document.getElementById("unit");
var employeeSelect = document.getElementById("employee");

// Populate employees based on selected unit
unitSelect.addEventListener("change", function() {
    var unit = unitSelect.value;
    employeeSelect.innerHTML = ""; // Clear existing options
    if (unit !== "") {
        employeesData[unit].forEach(function(employee) {
            var option = document.createElement("option");
            option.text = employee;
            option.value = employee;
            employeeSelect.appendChild(option);
        });
    }
});
