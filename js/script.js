const countries = initialCountries;
const activeListElement = document.querySelector(".submited");
const activeList = [];
const input = document.querySelector(".myInput");

const moveBackward = (name) => {
  const countyident = document.getElementById(name);
  countyident.parentNode.removeChild(countyident);
  if (!countries.includes(name)) {
    countries.push(name);
    countries.sort();
    let countryIndex = activeList.indexOf(name);
    activeList.splice(countryIndex, 1);
  }
};

const createCountry = (name) => {
  const listElement = document.createElement("li");
  const removeButton = document.createElement("button");
  const textElement = document.createElement("span");

  textElement.textContent = name;
  textElement.setAttribute("value", name);

  removeButton.textContent = "✕";
  removeButton.classList.add("deleteButton");
  removeButton.setAttribute("value", name);
  removeButton.addEventListener("click", function () {
    if (initialCountries.includes(name)) {
      moveBackward(name);
    } else {
      let countryIndex = activeList.indexOf(name);
      activeList.splice(countryIndex, 1);
      refreshCountries();
    }
  });

  listElement.appendChild(textElement);
  listElement.appendChild(removeButton);
  listElement.setAttribute("value", name);
  listElement.setAttribute("id", name);

  return listElement;
};

const addNewCountry = () => {
  if (input.value) {
    const name = input.value;
    const isAlreadyAdded = activeList.includes(name);
    if (isAlreadyAdded) return;
    activeList.push(name);
    refreshCountries();
    input.value = "";
  }
};

const refreshCountries = () => {
  activeListElement.textContent = "";
  activeList.map((country) =>
    activeListElement.appendChild(createCountry(country))
  );
};

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var listWrapper,
      listItem,
      val = this.value;
    closeAllLists();

    if (!val) {
      return false;
    }
    currentFocus = -1;

    listWrapper = document.createElement("DIV");
    listWrapper.setAttribute("id", `${this.id}autocomplete-list`);
    listWrapper.classList.add("autocomplete-items");

    this.parentNode.appendChild(listWrapper);

    for (let i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        listItem = document.createElement("DIV");
        listItem.innerHTML =
          "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        listItem.innerHTML += arr[i].substr(val.length);
        listItem.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        listItem.addEventListener("click", function (e) {
          const countryName = this.getElementsByTagName("input")[0].value;
          activeList.push(countryName);
          const countryIndex = countries.indexOf(countryName);
          countries.splice(countryIndex, 1);
          refreshCountries();
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          input.value = "";
        });
        listWrapper.appendChild(listItem);
      }
      6;
    }
  });
  inp.addEventListener("keydown", function (e) {
    let autocompleteList = document.getElementById(
      this.id + "autocomplete-list"
    );
    if (autocompleteList) {
      autocompleteList = autocompleteList.getElementsByTagName("div");
    }
    if (e.keyCode == 40) {
      // DOWN KEY
      currentFocus++;
      addActive(autocompleteList);
    } else if (e.keyCode == 38) {
      // UP KEY
      currentFocus--;
      addActive(autocompleteList);
    } else if (e.keyCode == 13) {
      //ENTER KEY
      e.preventDefault();
      if (currentFocus > -1) {
        if (autocompleteList) autocompleteList[currentFocus].click();
      }
    }
  });
  function addActive(item) {
    /*a function to classify an item as "active":*/
    if (!item) return false;
    removeActive(item);
    if (currentFocus >= item.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = item.length - 1;
    item[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(item) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    let list = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < list.length; i++) {
      if (elmnt != list[i] && elmnt != inp) {
        list[i].parentNode.removeChild(list[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("myInput"), countries);
