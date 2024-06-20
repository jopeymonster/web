function MakeMaid (name, age, duties) {
    this.name = name;
    this.age = age;
    this.duties = duties;
    this.clean = function () {
        alert("Cleaning in progress...");
    }
}