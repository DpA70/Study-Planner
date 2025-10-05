import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-tab',
  imports: [FormsModule],
  templateUrl: './home-tab.html',
  styleUrl: './home-tab.scss'
})
export class HomeTab {

  typedText: string = '';


  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getSchedule();
    }
  }

  getSchedule(){
    console.log(this.typedText);
  }
}
