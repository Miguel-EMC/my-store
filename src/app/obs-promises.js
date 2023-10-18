const{Observable} = require('rxjs');

const doSomething = () =>{
  return new Promise((resolve)=>{
    resolve('valor 1')
  })
}

const doSomething$ = () =>{
  return new Promise((resolve)=>{
    return new Observable(observer => {
      observer.next('valor 1 $');
    })
  })
}


(async () =>{
  const rta = await doSomething();
  console.log(rta);
})();

(() =>{
  const obs$ = doSomething$();
  obs$.subscribe(rta => {
    console.log(rta);
  })
})();
