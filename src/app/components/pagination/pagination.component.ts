import { NgStyle } from '@angular/common';
import { Component, input, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { bootstrapChevronLeft, bootstrapChevronRight } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {

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

    leftArrow: any = bootstrapChevronLeft
    righArrow: any = bootstrapChevronRight

    setCurrentPage = (page: number) => 
    {
      // this.currentPage.set(page)
    }

    setPerPage = (page: number) => 
    {
      // this.perPage.set(page) 
    }
    
    setPages = (total: number) => 
    {
      //  this.totalPages.set(total)
    }

    ngOnInit () : void 
    {
      //  for (let index = 1; index <= this.showLinks(); index++) 
      //  {
      //     if((this.currentPage() -index) >= 1)
      //     {
      //       this.decrease.update(current => [...current, this.currentPage()-index])
      //     }
      //  }

      //  for (let index = 1; index <= this.showLinks(); index++) 
      //  {
      //     if((this.currentPage()+index) > this.currentPage())
      //     {
      //       this.increase.update(current => [...current, this.currentPage()+index])
      //     }
      //  }  
       
      //  const sorting = this.decrease().reverse()

      //  const before= sorting.map((num: number, index: number) => 
      //  {
      //    if(num !== this.currentPage() && this.currentPage() >= 1)
      //    {
      //      return `<button key={index} className="rounded-lg border border-teal-500 px-4 py-2 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-green-600 hover:bg-green-800" onClick={() => fetchRoles(num, perPage)}>{(num)}</button>` 
      //    }
      //  })   
       
      //  const after= this.increase().map((num: number, index: number) => 
      //  {
      //     if(num != this.currentPage() && this.currentPage() >= 1)
      //     {
      //       if(Number(pages) >= num)
      //       {
      //         return <button key={index} className="rounded-lg border border-teal-500 px-4 py-2 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-green-600 hover:bg-green-800" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
      //       }
      //     }
      //   })

    } 

    // ngOnChanges(changes: SimpleChanges)
    // {
    //   if(changes['currentPage'])
    //   {
    //     console.log(changes['currentPage'])
    //   }
    // }

    show = (pageNumber: number) => 
    {
        this.pageData.emit({ page: pageNumber})
    }  

}
