const input = document.querySelector(".add");
const text = document.querySelector(".second-block");
const circle = document.querySelector(".progress-ring__circle");
const continueBlock = document.querySelector(".continue");
const img = document.querySelector(".avatar");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const arrowUp = document.querySelector(".up");
const arrowDown = document.querySelector(".down");

circle.style.strokeDasharray = `${circumference}  ${circumference}`;
circle.style.strokeDashoffset = circumference;

let arr = [],
  count = 0,
  num = 1,
  ready = [],
  wishInt = 0;

function check() {
  if (input.value !== "") {
    addWishes();
    input.value = "";
  } else {
    alert("Write Wishes");
  }
}

input.addEventListener("keyup", function go(event) {
  if (event.key === "Enter") {
    check();
  }
});

////////////////////////// Progress bar //////////////////////////////////

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  if (percent >= 20) {
    circle.style.stroke = "red";
    document.querySelector(".icon").src = "./img/angry.png";
  }
  if (percent >= 40) {
    circle.style.stroke = "yellow";
    document.querySelector(".icon").src = "./img/neutral.png";
  }
  if (percent >= 75) {
    circle.style.stroke = "springgreen";
    document.querySelector(".icon").src = "./img/smile.png";
  }
  document.querySelector(".persent").innerHTML =
    "Current level of enjoyment " + percent + " %";

  if (percent > 100) {
    localStorage.removeItem("Curent Val");
    document.querySelector(".persent").innerHTML =
      "Current level of enjoyment " + 100 + " %";
  }

  if (percent < 0) {
    document.querySelector(".persent").innerHTML =
      "Current level of enjoyment " + 0 + " %";
  }
}
///////////////////////// continue progress bar ////////////////////////

const CircleContainer = document.querySelector(".circl");

function ContinueProgres(int) {
  if (int >= 100) {
    circle.style.display = "none";
    document.querySelector(".progress-ring").style.display = "none";
    document.querySelector(".smile").style.display = "none";
    document.querySelector(".congratulation-img").style.display = "block";
  }
}

/////////////////////////////////  reset progress bar /////////////////////////
const ElReloadPgBar = document.querySelector(".return");
ElReloadPgBar.addEventListener("click", () => {
  count = 0;
  setProgress(count);
  let div = document.querySelector(".ready__wish");
  continueBlock.remove(div);

  document.querySelector(".congratulation-img").style.display = "none";
  localStorage.removeItem("Curent Val");
  localStorage.removeItem("ready-items");
  location.reload();
});

///////////////////////////////// create wishes element ///////////////////////////

function addWishes(values = input.value) {
  const WishBlock = document.createElement("div");
  const btnBlock = document.createElement("div");
  const delBtn = document.createElement("button");
  const acceptBtn = document.createElement("button");
  acceptBtn.className = "accept-btn";
  btnBlock.className = "btn_block";
  delBtn.className = "delete-btn";
  WishBlock.className = "wishes";
  WishBlock.style.visibility = "visible";
  text.appendChild(WishBlock);
  WishBlock.innerHTML = values;
  btnBlock.appendChild(acceptBtn);
  btnBlock.appendChild(delBtn);
  WishBlock.appendChild(btnBlock);

  delBtn.addEventListener("click", function DeleteWishes() {
    let data = JSON.parse(localStorage.getItem("item"));

    let ind = data.indexOf(values);
    if (ind !== -1) {
      data.splice(ind, 1);
      text.removeChild(WishBlock);
    }

    let DeleteFromArr = arr.indexOf(values);
    if (DeleteFromArr !== -1) {
      arr.splice(DeleteFromArr, 1);
    }

    localStorage.setItem("item", JSON.stringify(data));
  });

  acceptBtn.addEventListener("click", function gets(e) {
    let getYes = confirm("Ready ???");
    if (getYes) {
      createP(values);

      count += 20;
      setProgress(count);
      ContinueProgres(count);
      ready.push(values);
      localStorage.setItem("ready-items", JSON.stringify(ready));
      text.removeChild(WishBlock);

      localStorage.setItem("Curent Val", count);

      let getItem = JSON.parse(localStorage.getItem("item"));

      let myIndex = getItem.indexOf(values);
      console.log(values);
      if (myIndex !== -1) {
        getItem.splice(myIndex, 1);
      }

      let MainArr = arr.indexOf(values);
      if (MainArr !== -1) {
        arr.splice(MainArr, 1);
      }

      localStorage.setItem("item", JSON.stringify(getItem));
    }
  });

  arr.push(values);
  localStorage.setItem("item", JSON.stringify(arr));
}

/////////////////////Fulfilled wishes log elements //////////////////////////////
function createP(val) {
  let date = new Date().toDateString();

  let div = document.createElement("div");
  let closeBtn = document.createElement("button");
  let span = document.createElement("span");
  span.className = "time-line";
  closeBtn.className = "delete-btn";
  div.className = "ready__wish";
  continueBlock.appendChild(span);
  continueBlock.appendChild(div);
  div.innerHTML = `${num}. ${val}`;

  div.appendChild(closeBtn);

  span.textContent = "Done: " + date;
  closeBtn.addEventListener("click", () => {
    count -= 20;
    localStorage.setItem("Curent Val", count);
    setProgress(count);
    continueBlock.removeChild(div);
    continueBlock.removeChild(span);

    let getReadyWishes = JSON.parse(localStorage.getItem("ready-items"));

    let indexFromArray = getReadyWishes.indexOf(val);
    if (indexFromArray !== -1) {
      getReadyWishes.splice(indexFromArray, 1);
    }
    localStorage.setItem("ready-items", JSON.stringify(getReadyWishes));
    location.reload();
  });

  num++;
}

///////////////////// render after reload Page /////////////////////////////////////

window.addEventListener("load", function reloadPage() {
  let getItem = JSON.parse(localStorage.getItem("item"));
  let getInt = localStorage.getItem("Curent Val");
  let getReadyWishes = JSON.parse(localStorage.getItem("ready-items"));
  let getName = localStorage.getItem("Name");

  if (getReadyWishes) {
    for (let i = 0; i < getReadyWishes.length; i++) {
      createP(getReadyWishes[i]);

      ready.push(getReadyWishes[i]);
    }

    this.localStorage.setItem("ready-items", JSON.stringify(getReadyWishes));
  }

  if (getInt > 0) {
    count = parseInt(getInt);
    setProgress(count);
    ContinueProgres(count);
  } else {
    getInt = 0;
    localStorage.setItem("Curent Val", getInt);
    setProgress(getInt);
  }

  if (getItem) {
    for (let i = 0; i < getItem.length; i++) {
      let data = getItem[i];
      addWishes(data);
    }
  }

  if (getName) {
    createNameElement(getName);
  }
});

///////////////////////////// Change name //////////////////////////////

const EnterName = document.querySelector(".Enter_name");
const d = document.querySelector(".Name");
const changeName = document.querySelector(".change_name");
const removeNameBtn = document.createElement("input");

EnterName.addEventListener("keyup", function f1(e) {
  if (e.key === "Enter") {
    createNameElement();
  }
});

function createNameElement(data = EnterName.value) {
  const divForInput = document.createElement('div')
  divForInput.className = 'blockInput';
  
  removeNameBtn.setAttribute("type", "image");
  removeNameBtn.className = 'closeName'
  removeNameBtn.src = "../img/cross.png";
  d.style.display = "flex";
  d.style.margin = '5px'
  EnterName.style.display = "none";
  d.innerHTML = data;
  divForInput.appendChild(removeNameBtn);
  d.appendChild(divForInput)

  localStorage.setItem("Name", data);
}

function ClearName() {
  EnterName.style.display = "block";
  d.style.display = "none";
  d.innerHTML = "";
  EnterName.value = "";
  localStorage.removeItem("Name");
}
removeNameBtn.addEventListener("click", () => {
  ClearName();
});

changeName.addEventListener("click", () => {
  ClearName();
});

//////////////// arrow btn ///////////////////////////////////////

arrowUp.addEventListener("click", () => {
  continueBlock.style.display = "none";
  arrowUp.style.visibility = "hidden";
  arrowDown.style.visibility = "visible";
});

arrowDown.addEventListener("click", () => {
  continueBlock.style.display = "block";
  arrowUp.style.visibility = "visible";
  arrowDown.style.visibility = "hidden";
});

//////////////////////////////////////// hints for interface elements /////////////////

let tooltipElem;

document.addEventListener("mouseover", (e) => {
  let target = e.target;

  let toolTipHTML = target.dataset.tooltip;

  if (!toolTipHTML) return;

  tooltipElem = document.createElement("div");
  tooltipElem.className = "tooltip";
  tooltipElem.innerHTML = toolTipHTML;
  document.body.append(tooltipElem);

  let coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0; //do not drive over the left edge of the window

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    // if the tooltip does not fit at the top, display it at the bottom
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + "px";
  tooltipElem.style.top = top + "px";
});

document.addEventListener("mouseout", (e) => {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem.style.display = "none";
  }
});

/////////////////////////////////////////////////////
