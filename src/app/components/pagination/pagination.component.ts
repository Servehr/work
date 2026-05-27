import { NgStyle } from '@angular/common';
import { Component, computed, effect, input, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { bootstrapChevronLeft, bootstrapChevronRight } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

    perPage      = input<number>(5)
    currentPage  = input<number>(1)
    totalPages   = input<number>(0)
    noOfPages   = input<number>(20)
    hasNextPage  = input<boolean>(false)
    hasPreviousPage  = input<boolean>(false)
    pageData = output<{ page: number }>()

    decrease = signal<number[]>([])
    increase = signal<number[]>([])

    showLinks = signal<number>(2)
    paginationLinks = signal<number>(6)

    leftArrow: any = bootstrapChevronLeft
    righArrow: any = bootstrapChevronRight
    
    constructor()
    {
      effect(() => 
      {
        if(this.currentPage() != -1 && (this.currentPage()-1) > 0 && this.hasPreviousPage())
        {
          if(this.currentPage() > 7)
          {
            this.paginationLinks.set(6)
          } else (
            this.paginationLinks.set(this.currentPage() - 1)
          )
          
          for (let index = 1; index <= this.showLinks(); index++) 
          {
            if(this.currentPage()-index != 0)
            {
               this.decrease.update(current => [...current, this.currentPage()-index])
            }
          }
          this.decrease().reverse()     
          console.log(this.decrease())       
        }

        if((this.noOfPages() > this.currentPage()) && this.hasNextPage())
        {
          if((this.noOfPages() - this.currentPage()) > 6)
          {
            this.paginationLinks.set(6)
          } else (
            this.paginationLinks.set(this.noOfPages() - this.currentPage())
          )
          
          for (let index = 1; index <= this.showLinks(); index++) 
          {
            if(!((this.currentPage()+index) > this.noOfPages()))
            {
               this.increase.update(current => [...current, this.currentPage()+index])
            }
          }   
          console.log(this.increase())  
        }
        
      },  { allowSignalWrites: true }) 
    }

    show = (pageNumber: number) => 
    {
        this.pageData.emit({ page: pageNumber})
    }  

}
