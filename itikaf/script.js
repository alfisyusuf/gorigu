var employeesData = {
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
