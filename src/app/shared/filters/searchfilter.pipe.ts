import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(value: any, filterdShop: string, propName: string): any {
    if(value.length == 0 || filterdShop === '')
      {
        return value;
      }
      const resultArray: any = []
      for(const item of value)
        {
          if(item.name === filterdShop)
            resultArray.push(item)
        }
        return resultArray
  }
}
