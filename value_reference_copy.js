/**
 * javascript 에서 Primitive 변수( value copy )와 
 *    Object 변수( referencce copy )
 * 
 *  primitive 변수 : number, string, undefined, null
 */

 
 // javascript 에서 Primitive 변수는 Value 복사를 하고
 var a = 23;
 var b = a;
 a = 30;            // a 의 수정이 b 에게 영향을 주지 않음.

 console.log( a );  // 30
 console.log( 'b : ' + b );  // 23

 
 // javascript 에서 Object 변수는 Reference 복사를 한다.
var obj_1 = 
{
    name : 'John',
    age : 26
}

var obj_2 = obj_1;
obj_1.age = 30;     // obj_1 의 수정이 obj_2 까지 영향을 줌.

console.log( 'obj_2.age : ' + obj_2.age );  // 30


// Object 의 value 복사를 위한 Object.assign( target, source )
const person = 
{
    name: 'john',
    age: 15000,
    nickname: 'man from earth',
    getName: function() {
      return this.name;
    },
}
  const newPerson = Object.assign({}, person);   // person 객체 value 복사
  newPerson.name = 'chris';
  console.log( person.getName() );           // john
  console.log( newPerson.getName() );        // chris



/**
 * javascript 의 this 
 * - this 는 자신의 호출자를 의미하며, 
 *   분명한 호출자가 없을 경우에는 window 를 의미함.
 */

alert( this === window );       // true : 분명한 지정없음 호출자 window

const caller = 
{
    func : function() 
    {
        alert( this === window );
    }
}

caller.func();      // false : 호출자 caller


/**
 * 2. 생성자 함수를 사용하여 호출자 지정 시
 * - new 를 사용하여 생성된 객체가 새로운 호출자가 됨
 */

function NewObject( name, color ) 
{
    this.name = name;
    this.color = color;
    this.isWindow = function() 
    {
        console.log( this );
        return ( this === window );
    }
} 

const newObj_1 = new NewObject( 'Nana', 'yellow' );
console.log( newObj_1.name );             // Nana
console.log( newObj_1.color );            // yellow
console.log( newObj_1.isWindow() );       // false : 호출자는 newObj_1

const newObj_2 = new NewObject( 'Johnson', 'blue' );
console.log( newObj_2.name );             // Johnson
console.log( newObj_2.color );            // blue
console.log( newObj_2.isWindow() );       // false : 호출자는 newObj_2


/**
 * 3. 객체의 내부함수에서 사용되는 this 
 * - 객체의 내부함수에서 this 의 호출자는 window
 * - 객체는 외부함수까지만 영향력 행사.
 */

const obj = 
{
    outerFunc : function() 
    {
        function innerFunc() 
        {
            console.log( this );        // inner 함수의 호출자는 window
        }

        innerFunc();
    }

} 

obj.outerFunc();        // obj 의 접근이 outerFunc() 까지만 가능하므로



/**
 * 4. 내부함수에서 외부 this 사용하기
 */

function Family( firstName ) 
{
    this.firstName = firstName;
    const names = ['bill', 'mark', 'steve'];
    
    names.map( function( name, index ) 
    {
      console.log( name + ' ' + this.firstName );     // 내부함수의 호출자 : window
      console.log( this );
    });
}
  const kims = new Family('kim');
  // bill undefined
  // window
  // mark undefined
  // window
  // steve undefined
  // window 

// 4.1 outer 변수 활용 : 내부함수에 외부함수의 this 를 전달하려면 
function Family_1( firstName ) 
{
    this.firstName = firstName;
    const lastNames = ['bill', 'mark', 'steve'];
    let that = this;                                // this 를 외부변수로 지정함.
    
    lastNames.map( function( lastName, index )      // lastName : 그냥 개별항목을 의미하고 제한없음.
    {
      console.log( lastName + ' ' + that.firstName ); // 호출자 : that === this
    });
}
  const kims = new Family_1( 'kim' );
 // bill kim
 // mark kim
 // steve kim 


 // 4.2 bind( this ) 로 함수를 객체에 고정시킴 
 function Family_2( firstName ) 
 {
   this.firstName = firstName;
   const lastNames = ['bill', 'mark', 'steve'];

   lastNames.map( function( lastName, index ) 
   {
     console.log( lastName + ' ' + this.firstName );  // 호출자 : Family_2 : this 사용가능
   }.bind( this ) );                                  // bind( this ) : 함수를 객체에 고정
 }
 const jungs = new Family_2( 'Jung' );
// bill Jung
// mark Jung
// steve Jung 


// 4.3 ( => ) 함수 사용 
function Family_3( firstname ) 
{
    this.firstName = firstname;
    const names = ['bill', 'mark', 'steve'];
    names.map( ( names, index ) => 
    {
        console.log( lastName + ' ' + this.firstName ); // 호출자 : Family_3
    });
}
const parks = new Family_3( 'Park' );