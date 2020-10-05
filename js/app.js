//if user adds a note,add it to the local Storage.
showNotes();

function notesapp(title,text){
    this.title=title;
    this.text=text;
}

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    let addtxt = document.getElementById("addTxt").value;
    let title=document.getElementById("title").value;
    let note=new notesapp(title,addtxt);
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(note);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    clearfields(addtxt,title);
    showNotes();
    displayMessage('Your Note is Added Successfully!','success');
    document.querySelector('#addBtn').disabled=true;
})

//Function to display notes in our Page.
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button class="btn btn-danger" id="${index}" onClick="deleteNote(this.id)">Delete Note</button>
            </div>
          </div>` ;



    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML=`<span class="text-danger">Nothing to Show! Add a note through section above to add notes</span>`;
    }

}

//function to Delete notes
function deleteNote(index){
  let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
     notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
     showNotes();
     displayMessage('Your Note is Deleted SuccessFully','danger');
}


//To search the notes
let search=document.getElementById('searchTxt')
search.addEventListener("input",function(){
    let inputVal=search.value;
    let  noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((el)=>{
      let cardtxt=el.getElementsByTagName("p")[0].innerText;
      if(cardtxt.includes(inputVal)){
          el.style.display="block"
      }else{
        el.style.display="none"
      } 
    })
});

//display Message
function displayMessage(message,kaksha){
    let messdiv=document.createElement('div');
    messdiv.className=`alert alert-${kaksha}`;
    let text=document.createElement("p");
    text.innerText=message;
    messdiv.appendChild(text);
    const container=document.querySelector('.container');
    const card=document.querySelector('.card');
    container.insertBefore(messdiv,card)
    setTimeout(()=>{
        document.querySelector('.alert').remove();
        document.querySelector('#addBtn').disabled=false;
    },3000);

}

//clear input fields
 function clearfields(text,title){
      document.querySelector("#title").value="";
      document.querySelector("#addTxt").value="";
}
