import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})

export class PopupComponent {
    constructor() {}
    
    ngOnInit() {
        // Get the modal
        var modal = document.getElementById("myModal");
    
        // // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
    
        // Get the <span> element that closes the modal
        var span = <HTMLElement>document.getElementsByClassName("close")[0];

        // // When the user clicks the button, open the modal 
        // btn.onclick = function() {
        //     modal.style.display = "block";
        // }

        if (!sessionStorage.getItem('openPopup')) {
            modal.style.display = "block";
        }
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            sessionStorage.setItem('openPopup', 'false')
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                sessionStorage.setItem('openPopup', 'false')
            }
        }
    }

}