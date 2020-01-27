/**
 * this 를 고정시키는 3가지 방법( call, apply, bind )
 * - 호출자에 따라 달라지는 this 를 고정시키는 3가지 방법
 */

// 1. call( obj, ...parameters ) : 함수 호출 시 객체의 메소드화
//                  해당 함수가 넘겨진 객체의 메서드인 것처럼 사용

function Update( birthYear, occupation )    // 함수객체 정의
{
    this.birthYear = birthYear;
    this.occupation = occupation;
}

var bruce = { name : 'Bruce' };           // 변수객체 정의

Update.call( bruce, 1949, 'singer' );     // Update 를 bruce 와 결합시킴
/*
  bruce는 이제
  {
      name : 'Bruce',
      birthYear : 1949,
      occupation : 'singer'
  }
  로 변경됨
*/
console.log( bruce );


function greet()       // 미소속 함수 정의
{
    var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
    console.log( reply );
}
  
  var obj =             // 변수 Object 정의
  {
    animal: 'cats', 
    sleepDuration: '12 and 16 hours'
  };
  
  greet.call( obj );  // greet 를 일시적으로 obj 객체의 멤버함수화
                      // this 는 obj : cats typically sleep between 12 and 16 hours


function Product( name, price )   
{
    this.name = name;
    this.price = price;
  
    if (price < 0) {
      throw RangeError('Cannot create product ' +
                        this.name + ' with a negative price');
    }
    else 
    {
        console.log( this.name + ' is successfully made.');
    }
}
  
  function Food(name, price) 
  {
    Product.call( this, name, price );    // Product() 함수를 Food 에 결합시킴
    this.category = 'food';
    console.log( this );     // Food {name: "feta", price: 5, category: "food"}
  }
  
  function Toy(name, price) 
  {
    Product.call( this, name, price );    // Product() 함수를 Toy 에 결합시킴.
    this.category = 'toy';
    console.log( this );    // Toy {name: "robot", price: 40, category: "toy"}
  }
  
  var cheese = new Food( 'feta', 5 );
  var fun = new Toy( 'robot', 40 );


var sData = 'Wisen';            
function display()
{
    console.log('sData value is %s ', this.sData);
}
  
  display.call();  // this 는 window : sData value is Wisen  



// 2. apply() : 매개변수를 배열로 받는다
// - call() 과 동일한 기능이지만 매개변수가 배열임.

function Update( birthYear, occupation )    // 함수객체 정의
{
    this.birthYear = birthYear;
    this.occupation = occupation;
}

  var bruce = { name : 'Bruce' };           // 변수객체 정의

  update.apply( bruce, [1949, 'singer'] );  // 함수객체를 변수객체 bruce 에 결합시킴
  /*
    bruce는 이제
    {
        name : 'Bruce',
        birthYear : 1949,
        occupation : 'singer'
    }
    로 변경됨
  */
  console.log( bruce );


 // 기타 : apply로 배열과 배열 합치기 
  var array = ['a', 'b'];
  var elements = [0, 1, 2];
  array.push.apply( array, elements );      // 배열과 배열 합치기
  console.info( array );                    // ["a", "b", 0, 1, 2]  

// 기타 : 내장함수 사용  
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply( null, numbers );    
// 이는 Math.max(numbers[0], ...) 또는 Math.max(5, 6, ...) 와 거의 같음



// 3. bind() : this 를 영구히 고정시킴
// - 한 번 bind 되면 영구히 고정됨.

function Update( birthYear, occupation )        // 함수객체 정의
{
    this.birthYear = birthYear;
    this.occupation = occupation;
};

var nancy = { name : 'Nancy' };               // 변수객체 정의

const updateNancy = Update.bind( nancy );     // 해당 함수객체를 nancy 에 고정
updateNancy( 1950, 'actoress' );
/*
  nancy 는 이제
  {
      name : 'Nancy',
      birthYear : 1950,
      occupation : 'actoress'
  }
  로 변경됨
*/
console.log( nancy );

var madeline = { name : 'Madeline' };         // 변수객체 정의
updateNancy.call(madeline, 1274, "king");     // 새로운 객체와 결합시도 실패
// nancy 는 이제 { name: "Nancy", birthYear: 1274, occupation: "king" };
// Madeline으로 변하지 않음
console.log( nancy );


