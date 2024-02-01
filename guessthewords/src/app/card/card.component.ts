import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { PalavrasService } from '../palavras.service';
import { Word } from '../word';
import {MatChipsModule} from '@angular/material/chips';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatChipsModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  sercretWord = "";
  clue1 = "";
  clue2 = "";
  clue3 = "";
  clue4 = "";
  constructor(
    private palavraService: PalavrasService,
    private route: ActivatedRoute
    ) { }
  palavras_Data: Word[] = [];


  ngOnInit(): void {
    this.getPalavras();
    let objWord = this.getRandomWord();
    this.sercretWord = objWord.Word
    this.clue1 = objWord.Clue1
    this.clue2 = objWord.Clue2
    this.clue3 = objWord.Clue3
    this.clue4 = objWord.Clue4
    console.log(this.palavras_Data);
    console.log("cheio");
  }


    
  getPalavras(): void {
    let categoria = String(this.route.snapshot.paramMap.get('categoria'));
    // let categoria = "All"
    console.log("categoria");
    console.log(categoria);
    //if category is null or None, return all data
    if (categoria == "null" || categoria == "None"|| categoria == "All" ){
      this.palavraService.getData()
        .subscribe(data => this.palavras_Data = data);
    }
    else {
      this.palavraService.getData()
        .subscribe(data => this.palavras_Data = data.filter(a => a.Category == categoria));
    }

  }

  //geta randon word from the list
  getRandomWord(): Word {
    var random = Math.floor(Math.random() * this.palavras_Data.length);
    return this.palavras_Data[random];
  }

  refresh(){
    console.log("wordnew");
    let objWord = this.getRandomWord();
    this.sercretWord = objWord.Word
    this.clue1 = objWord.Clue1
    this.clue2 = objWord.Clue2
    this.clue3 = objWord.Clue3
    this.clue4 = objWord.Clue4
  }

}
