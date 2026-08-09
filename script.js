

const button = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const loading = document.getElementById("loading");

button.addEventListener("click", fetchUsers);

async function fetchUsers(){

    loading.textContent = "Loading...";
    results.innerHTML = "";

    try{

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        const data = await response.json();

        loading.textContent = "";

        const search = searchInput.value.toLowerCase();

        const filteredUsers = data.filter(user =>
            user.name.toLowerCase().includes(search)
        );

        if(filteredUsers.length === 0){
            results.innerHTML = "<h3>No users found.</h3>";
            return;
        }

        filteredUsers.forEach(user=>{

            const div = document.createElement("div");

            div.classList.add("card");

            div.innerHTML = `
                <h2>${user.name}</h2>
                <p>Email: ${user.email}</p>
                <p>City: ${user.address.city}</p>
                <p>Company: ${user.company.name}</p>
            `;

            results.appendChild(div);

        });

    }

    catch(error){

        loading.textContent = "";

        results.innerHTML =
        "<h2>Something went wrong!</h2>";

        console.log(error);

    }

}









