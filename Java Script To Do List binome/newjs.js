var todos=[];// create Array
load();//loading the Json local storage.
document.getElementById('clear').addEventListener('click',clearLocalStorage);
document.getElementById('btnSave').addEventListener('click',save);

document.getElementById('sendTxt').addEventListener('click', creation);
//creation
function creation() {
                    var task=document.getElementById("inputTxt").value;
                    if((task.match(/^\s+$/)!=null) | task==""){
                                          console.log(task.match(/^\s+$/));
                      return;
                    }else{
                    var todo = {
                                id : "tache"+todos.length,
                                name: task,
                                comp: false
                              }
                    todos.push(todo);
                    createList(todo);
                  }
}
// create the list based on Attributes Complete yes or no
function createList(task) {
                        var list=document.getElementById("toDoLst");
                        var newLi=document.createElement('li');
                        var newP=document.createElement('p');
                        var listCom=document.getElementById('cmp');

                        newP.innerText = task.name;
                        newLi.appendChild(newP);
                        var buttCont=createButtons(list,listCom);
                        for (var i = 0; i < todos.length; i++) {
                          if (todos[i].comp==false && todos[i].name == task.name ){
                            newLi.setAttribute("id", todos[i].id);
                            newLi.appendChild(buttCont);
                            list.appendChild(newLi);
                          }else{
                            listCom.appendChild(newLi);
                          }
                      }
}

function createButtons(list,listCom){ // DIV with the buttons
                          var btnSupp=document.createElement('button');
                          var btnEdit=document.createElement('button');
                          var btnComp=document.createElement('button');
                          var btnContainer=document.createElement('div');
                          btnSupp.innerText='X';
                          btnSupp.onclick=function(){
                            var toDelete=btnSupp.parentNode.parentNode;
                            var i=0
                            while((toDelete=toDelete.previousSibling) !=null)
                            i++;
                            var toDelete=btnSupp.parentNode.parentNode;
                            list.removeChild(toDelete);
                            todos.splice(i,1);
                          }
                          // Edit button
                          btnEdit.innerText='Edit';
                          btnEdit.onclick=function(){
                            this.disabled= true;
                            btnEdit.parentNode.parentNode.firstChild.innerText="";
                            var newInput=document.createElement('input');
                            btnEdit.parentNode.parentNode.prepend(newInput);
                            newInput.onkeyup=function(e){
                              if (e.keyCode==13){
                                var i=0;
                                var toEdit=this.parentNode;
                                while((toEdit=toEdit.previousSibling) !=null)
                                i++;
                                console.log(i);

                                var newContent=this.value;
                                btnEdit.parentNode.parentNode.children[1].innerText=newContent;
                                btnEdit.parentNode.parentNode.removeChild(btnEdit.parentNode.parentNode.firstChild);
                                btnEdit.disabled= false;
                                todos[i].name=newContent;

                              }
                            }
                          }
                        //Button Finito
                        btnComp.innerText="Finito";
                        btnComp.onclick=function(){
                                                  var completer=btnComp.parentNode.parentNode.firstChild;
                                                  var toDelete = btnComp.parentNode.parentNode;

                                                  for (var i=0; i < todos.length; i++) {
                                                                    if (toDelete.getAttribute("id") == todos[i].id) {
                                                                      todos[i].comp=true;
                                                                    }

                                                  }

                                                  list.removeChild(toDelete);
                                                  var compLi=document.createElement('li');
                                                  listCom.appendChild(compLi);
                                                  compLi.appendChild(completer);
                                                 for (var i=0; i < todos.length; i++) {
                                                   console.log(todos[i].name);
                                                   console.log(todos[i].comp);
                                                 }
                      }
                      btnContainer.appendChild(btnSupp);
                      btnContainer.appendChild(btnEdit);
                      btnContainer.appendChild(btnComp);
                      return btnContainer;
}
//Clear Storage
function clearLocalStorage(){
  localStorage.clear();
  location.reload();
}
//Save
function save(){
  for (var i = 0; i < todos.length; i++) {
    var myJSON= JSON.stringify(todos[i]);
    localStorage.setItem("toDos"+i,myJSON);
  }
}
//load
function load(){
  if ( localStorage.length>0){
    for (var i = 0; i < localStorage.length; i++) {
      todos.push(JSON.parse(localStorage.getItem("toDos"+i)));
      createList(todos[i]);
    }
  }
}
