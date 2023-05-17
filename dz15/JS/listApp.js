class Contact{
   constructor(name, number, isbn) {
      this.name = name;
      this.number = number;
      this.isbn = isbn;
   }
}
class UI{
   static displayContacts() {
      const contacts = Book.getContact();
      contacts.forEach((contact) => UI.addContactToList(contact));
   }
   static addContactToList(contact) {
      const list = document.querySelector('#contact-list');
      const row = document.createElement('tr');
      row.innerHTML = ` 
         <td>${contact.name}</td>
         <td>${contact.number}</td>
         <td>${contact.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm-delete">x</a></td>
      `;
       list.appendChild(row)
   }
   static clearFilds() {
   document.querySelector('#name').value = '';
   document.querySelector('#phone').value = '';
   document.querySelector('#isbn').value = '';
   }
   static deleteContact(element) {
      if (element.classList.contains('delete')) {
         element.parentElement.parentElement.remove();
         UI.showAlert('The book has been deleted','warning')
      }
   }
   static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#contacts-form');
      container.insertBefore(div, form);

      setTimeout(() => document.querySelector('.alert').remove(),2000)
   }
}
class Book{
   static getContact() {
      let contacts;
      if (localStorage.getItem('contacts') === null) {
         contacts = []
      } else {
         contacts = JSON.parse(localStorage.getItem('contacts'));
      }
      console.log(contacts);
      return contacts
   }
   static addContact(contact) {
      const contacts = Book.getContact();
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
   }
   static removeContact(isbn) {
      const contacts = Book.getContact();
      contacts.forEach((contact,i) => {
         if (contact.isbn === isbn) {
            contacts.splice(i, 1);
         }
      })
      localStorage.setItem('contacts', JSON.stringify(contacts))
   }
}
document.querySelector('#contacts-form').addEventListener('submit', (e) => {
   e.preventDefault();
   const name = document.querySelector('#name').value;
   const phone = document.querySelector('#phone').value;
   const isbn = document.querySelector('#isbn').value;

   const contact = new Contact(name, phone, isbn);

   if (name === '' || phone === '' || isbn === '') {
      UI.showAlert('Fill in the empty fields', 'danger')
   } else {
      UI.addContactToList(contact);
      Book.addContact(contact);
      UI.clearFilds();
      UI.showAlert('The book has been added', 'success')
   }
});

document.querySelector('#contact-list').addEventListener('click', (e) => {
   console.log(e.target);
   UI.deleteContact(e.target);
   Book.removeContact(e.target.parentElement.previousElementSibling.textContent);
})
document.addEventListener('DOMContentLoaded', UI.displayContacts);