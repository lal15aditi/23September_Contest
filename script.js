const url="https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";

fetch(url).then(responce => responce.json()).then(data => {
    // console.log(data);
    // print the whole array/table
    function addMainRow(e) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td align="center">${e.id}</td>
            <td>
                <div class="name-img">
                    <img src="${e.img_src}" alt="">
                    <p>${e.first_name +" "+ e.last_name}</p>
                </div>
            </td>
            <td>${e.gender}</td>
            <td>${e.class}</td>
            <td>${e.marks}</td>
            <td>${e.passing ? "Passed" : "Failed"}</td>
            <td>${e.email}</td>
        `;
        main_body.append(newRow);
    }
    data.forEach(addMainRow);

    // take the array whose gender is female
    let fArray = data.filter(element => element.gender == 'Female');

    function addFemaleRow(e) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td align="center">${e.id}</td>
            <td>
                <div class="name-img">
                    <img src="${e.img_src}" alt="">
                    <p>${e.first_name +" "+ e.last_name}</p>
                </div>
            </td>
            <td>${e.gender}</td>
            <td>${e.class}</td>
            <td>${e.marks}</td>
            <td>${e.passing ? "Passed" : "Failed"}</td>
            <td>${e.email}</td>
        `;
        female_body.append(newRow);
    }
    fArray.forEach(addFemaleRow);

    // take the array whose gender is male
    let mArray = data.filter((element => element.gender == 'Male'));

    function addMaleRow(e) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td align="center">${e.id}</td>
            <td>
                <div class="name-img">
                    <img src="${e.img_src}" alt="">
                    <p>${e.first_name +" "+ e.last_name}</p>
                </div>
            </td>
            <td>${e.gender}</td>
            <td>${e.class}</td>
            <td>${e.marks}</td>
            <td>${e.passing ? "Passed" : "Failed"}</td>
            <td>${e.email}</td>
        `;
        male_body.append(newRow);
    }
    mArray.forEach(addMaleRow);

    let btnArray = document.querySelectorAll(".sort-btns>button");

    // sort from A to Z
    function sort_A_Z() {
        document.querySelector(".search-bar>input").value = "";
        let array1= data.map(e => e);
        array1.sort((a,b) => (a.first_name +" "+ a.last_name).localeCompare(b.first_name +" "+ b.last_name));
        document.querySelectorAll("#main_body>tr").forEach(e => e.remove());
        main_body.parentNode.classList.remove("t-none");
        female_body.parentNode.classList.add("t-none");
        male_body.parentNode.classList.add("t-none");
        array1.forEach(addMainRow);
        // console.log(btnArray);
    }

    btnArray[0].addEventListener("click", sort_A_Z);

    // sort from Z to A 
    function sort_Z_A() {
        document.querySelector(".search-bar>input").value = "";
        let array1= data.map(e => e);
        array1.sort((b,a) => (a.first_name +" "+ a.last_name).localeCompare(b.first_name +" "+ b.last_name));
        document.querySelectorAll("#main_body>tr").forEach(e => e.remove());
        main_body.parentNode.classList.remove("t-none");
        female_body.parentNode.classList.add("t-none");
        male_body.parentNode.classList.add("t-none");
        array1.forEach(addMainRow);
    }
    btnArray[1].addEventListener("click", sort_Z_A);

    // sort by marks
    function sort_by_marks() {
        document.querySelector(".search-bar>input").value = "";
        let array1= data.map(e => e);
        array1.sort((a,b) => a.marks-b.marks);
        document.querySelectorAll("#main_body>tr").forEach(e => e.remove());
        main_body.parentNode.classList.remove("t-none");
        female_body.parentNode.classList.add("t-none");
        male_body.parentNode.classList.add("t-none");
        array1.forEach(addMainRow);
    }
    btnArray[2].addEventListener("click", sort_by_marks);

    // sort by passing
    function sort_by_passing() {
        document.querySelector(".search-bar>input").value = "";
        let array1= data.filter(e => e.passing);
        document.querySelectorAll("#main_body>tr").forEach(e => e.remove());
        main_body.parentNode.classList.remove("t-none");
        female_body.parentNode.classList.add("t-none");
        male_body.parentNode.classList.add("t-none");
        array1.forEach(addMainRow);
    }
    btnArray[3].addEventListener("click", sort_by_passing);

    // sort by class
    function sort_by_class() {
        document.querySelector(".search-bar>input").value = "";
        let array1= data.map(e => e);
        array1.sort((a,b) => a.class-b.class);
        document.querySelectorAll("#main_body>tr").forEach(e => e.remove());
        main_body.parentNode.classList.remove("t-none");
        female_body.parentNode.classList.add("t-none");
        male_body.parentNode.classList.add("t-none");
        array1.forEach(addMainRow);
    }
    btnArray[4].addEventListener("click", sort_by_class);

    // sort by gender
    function sort_by_gender() {
        document.querySelector(".search-bar>input").value = "";
        main_body.parentNode.classList.add("t-none");
        female_body.parentNode.classList.remove("t-none");
        male_body.parentNode.classList.remove("t-none");
    }
    btnArray[5].addEventListener("click", sort_by_gender);

    // search button work
    let find = document.querySelector(".search-bar>button");

    function search_filter() {
        
        let input = document.querySelector(".search-bar>input").value.toLowerCase();
        let newArray = data.filter(e => {
            return e.first_name.toLowerCase().includes(input)||e.last_name.toLowerCase().includes(input)||e.email.toLowerCase().includes(input);
        })
        main_body.parentNode.classList.remove("t-none");
        female_body.parentNode.classList.add("t-none");
        male_body.parentNode.classList.add("t-none");
        document.querySelectorAll("#main_body>tr").forEach(e => e.remove());
        newArray.forEach(addMainRow);
        if(newArray.length == 0) alert("No Data Found");
    }
    find.addEventListener("click", search_filter);
})