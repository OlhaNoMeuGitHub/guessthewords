import { MatIconModule } from '@angular/material/icon'; //
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PalavrasService } from '../palavras.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Word } from '../word';


@Component({
  selector: 'app-listwords',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,RouterModule,MatPaginator,MatButtonToggleModule,MatFormFieldModule,MatSelectModule,MatCheckboxModule,MatTableModule],
  templateUrl: './listwords.component.html',
  styleUrl: './listwords.component.css'
})
export class ListwordsComponent implements AfterViewInit {
  palavras_Data: Word[] = [];
  selectedValue: string = "option2";
  categorias: string[] = [];
  displayedColumns: string[] = ['select','Word', 'Clue1', 'Clue2', 'Clue3', 'Clue4', 'Difficulty_Level', 'Category'];
  dataSource = new MatTableDataSource<Word>(this.palavras_Data);

  resultsLength = 0;
  selected = 'All';
  // dataSource = new ExampleDataSource(this.dataToDisplay);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private palavraService: PalavrasService) { }

  selection = new SelectionModel<Word>(true, []);

  ngOnInit(): void {
    this.getPalavras();
    this.getCategories()
    console.log(this.palavras_Data);
    console.log("cheio");
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  
  getPalavras(): void {
    this.palavraService.getData()
        .subscribe(palavras => {
          this.dataSource = new MatTableDataSource<Word>(palavras);
          this.palavras_Data = palavras;
        });
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Word): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Word + 1}`;
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //get categories from datasource
  getCategories() {
    let categoriesDource = this.dataSource.filteredData.map(a => a.Category);
    //remove duplicates
    this.categorias = categoriesDource.filter((item, index) => categoriesDource.indexOf(item) === index);
    console.log(this.categorias);
  }


  removeData() {

    console.log(this.dataSource.data);
    console.log(this.dataSource.data);
    // remove selected data
    this.selection.selected.forEach(item => {
      let index: number = this.dataSource.data.findIndex(d => d === item);
      console.log(this.dataSource.data.findIndex(d => d === item));
      this.dataSource.data.splice(index,1)
      this.dataSource = new MatTableDataSource<Word>(this.dataSource.data);
    });
    this.dataSource.paginator = this.paginator;
  }

  filtertable(filterValue: string) {
    //dont do nothing if filtervalue is null
    if(!filterValue) {
      //remove filter of datasource
      this.dataSource.filter = '';
      //select is euql to all
      this.selected = 'All';
      return;
    }

    console.log(filterValue);
    //filter datarsource using the collum Difficulty_Level with filtervalue 
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    //get itens filtered in datasource
    playgame() {
      let valorefiltrados = this.dataSource.filteredData.values();
      //convert valorefiltrados to Word[]
      let filteredData: Word[] = [];
      for (let val of valorefiltrados) {
        filteredData.push(val);
      }

      //send to service 
      this.palavraService.setMyWord(filteredData);
//teste

      }
}
