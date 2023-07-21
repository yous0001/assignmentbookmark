var iname=document.getElementById("input-book-name");
var iurl=document.getElementById("input-Website-URL");

var books=[ ]
if(localStorage.getItem("books")==null){}
else{
  books=JSON.parse(localStorage.getItem("books"))
  display();
}

function isUrlValid() {
      var url_regex=/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/
      var theurl =iurl.value;
      if(url_regex.test(theurl)){
      iurl.style.boxShadow="0 0 0 0.25rem #DEE0CE"
      iurl.style.borderColor="#198754"
      document.getElementById("urltrueicon").style.display="block"
      document.getElementById("urlerroricon").style.display="none"
      return true;
    }
    else{
      iurl.style.boxShadow="0 0 0 0.25rem #F2C8C0"
      iurl.style.borderColor="#DC3545"
      document.getElementById("urltrueicon").style.display="none"
      document.getElementById("urlerroricon").style.display="block"
      return false;
    }
   }


   function submitdata(){
    if(isvalid()){
      insertdata();
    }
    else{
      document.getElementById("dialog-open").style.display="block";
      document.getElementById("booksmark").style.opacity=0.3;
      
    }
   }
   function isnamevalid(){
    var bookname_regex=/[a-zA-Z ]{3,}$/;
    var thename =iname.value;
    if(bookname_regex.test(thename)){
      iname.style.boxShadow="0 0 0 0.25rem #DEE0CE"
      iname.style.borderColor="#198754"
      document.getElementById("nametrueicon").style.display="block"
      document.getElementById("nameerroricon").style.display="none"
      
      return true;
    }
    else{
      iname.style.boxShadow="0 0 0 0.25rem #F2C8C0"
      iname.style.borderColor="#DC3545"
      document.getElementById("nametrueicon").style.display="none"
      document.getElementById("nameerroricon").style.display="block"
      return false;
    }
    
   }


   function isvalid(){
    //url
    var urlvalidation=isUrlValid();

    //repeation
    var repeation=true;
    for(var i=0;i<books.length;i++){
      if(books[i].name==iname.value){
        repeation=false;
        break;
      }
   }

   //name
   var namevalidation=isnamevalid();

   if(urlvalidation&repeation&namevalidation){
    return true;
   }
   else{
    return false;
   }
   
   
  }



   function display(){
    var tbody=``;
    for(var i=0;i<books.length;i++){
      tbody+=`
      <tr>
      <td>${i}</td>
      <td>${books[i].name}</td>
      <td><button class="btn btn-success" onclick="window.location.href='https:${books[i].url}';"><i class="fa-solid fa-eye pe-2"></i>visit</button></td>
      <td><button class="btn btn-danger" onclick="remove(${i})"><i class="fa-solid fa-trash pe-2"></i></i>delete</button></td>
      </tr>`

    } 
    document.getElementById("table-body").innerHTML=tbody;
  }


   function insertdata(){
    var book={
      name:iname.value,
        url:iurl.value
    };
    books.push(book);
    console.log(books);
    localStorage.setItem('books',JSON.stringify(books));
    display();
    reset();
   }



   function reset(){
    iname.value="";
    iurl.value="";
   }


   function remove(x){
    books.splice(x,1)
    localStorage.setItem('books',JSON.stringify(books));
    display();
   }

   function closedialog(){
      document.getElementById("dialog-open").style.display="none";
      document.getElementById("booksmark").style.opacity=1;
   }
