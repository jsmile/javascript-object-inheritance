
/**
 * javascript Object
 */

 /**
  * 1. variable Object 정의
  * 변수선언을 통해 Object 정의 
  */

var John = 
{
    name : 'John', 
    yearOfBirth : '1991', 
    calculateAge : function() 
    {
        console.log( 2019 - this.yearOfBirth );
    }
}
John.email = 'jsmile@naver.com';

// 별도의 생성과정없이 사용가능.
console.log( John.name );
console.log( John.calculateAge() );
console.log( John.email );


/**
 * 2. 함수형 Object( 생성자 함수 ) 정의
 * - 함수선언을 통한 객체 정의
 */

function User( name )  
{
    this.name = name;
    this.yearOfBirth = '1990';

    this.calculateAge = function() 
    {
        return 2019 - this.yearOfBirth;
    }

    this.showUserInfo = function() 
    {
        document.write( 'Name = ' + this.name + ', age = ' + this.calculateAge() );
        document.write( '<br>' );
    }

} 

// new 를 사용해서 객체를 생성하여 사용가능
var nansy = new User( 'Nansy' );
nansy.showUserInfo();

// 해당 객체에만 속성 추가
nansy.email = 'jsmile@naver.com';   
console.log( "nansy's email : ", nansy.email );

// 다른 객체에는 email 속성이 추가되지 않음.
var tom = new User( 'Tom' );
console.log( "tom\'s email : ", tom.email );   // undefined

// prototype 설정은 객체 정의 시에만 가능함.  
// nansy.prototype.email = 'jsmile@naver.com';  // error
// User.prototype.email = 'jsmile@naver.com';   // ok.

 /**
 * 3. prototype 을 이용한 함수형 Object 의 정의확장과 상속
 * - prototype 을 이용하여 현재의 객체에 멤버변수나 멤버함수를 추가하여 상속.
 */

 // 먼저 함수형 객체를 만들고
 function Person( name, yearOfBirth ) 
 {
     this.name = name;
     this.yearOfBirth = yearOfBirth;
 }
 
 // 상속할 멤버함수를 추가하도록 선언
 Person.prototype.calculateAge = function() 
 {
     document.writeln( 'Name = ' + this.name + ', age = ' + ( 2019 - this.yearOfBirth ) );
     document.write( '<br>' );
 }
 // 상속할 멤버변수를 추가하도록 선언
 Person.prototype.email = 'jsmile@naver.com';

 var tom = new Person( 'Tom', '2002' );
 tom.calculateAge();
 console.log( 'email : ', tom.email );
 


/**
 * 4. Object.creat() 를 통한 변수형 객체생성
 */

// 변수형 객체를 먼저 선언한 다음에
var personProto = 
{
    calculateAge : function() 
    {
        document.writeln( this.name + "\'s Age : " + ( 2019 - this.yearOfBirth ) );
        document.write( '<br>' );
    }
}
// 객체를 Obejct.create() 로 생성하고 나서
var smith = Object.create( personProto );   // prototype 으로 personProto 를 갖음.
// prototype 동작에 필요한 멤버들을 추가한다.
smith.name = 'Smith';
smith.yearOfBirth = 1988;

// 멤버함수 사용
smith.calculateAge();


var jane = Object.create(

    personProto, 
    { 
        name : { value : 'Jane' }, 
        yearOfBirth : { value : 1998 }
    }
);

// 멤버함수 사용
jane.calculateAge();




/**
 *  상속 1 : prototype 에 부모객체 연결하기
 *  - prototype 으로 선언된 것들만 상속이 됨.
 *  - this 속성들 상속 불가
*/
function Person( name ) 
{
    this.name = name || '혁준';
}

// 상속할 멤버함수 정의
Person.prototype.getName = function() 
{
   return this.name;
}

function Korean( name ) {}

// prototype 상속지정
Korean.prototype = new Person();

// 자식객체를 생성할 때, parameter 를 넘겨도 부모객체게 전달되지 않음.
var kor1 = new Korean( '지수' );
console.log( '이름 : ', kor1.getName() );   // '혁준' : this 속성들 사용불가




/**
 *  상속 2 : 부모 생성자 빌려쓰기
 *  - 부모객체의 모든 this 속성들을 자식객체 생성함수에 참조가 아닌 복사하기
 *  - 부모의 this 속성들만 상속되고, 
 *  - prototype 속성들은 상속 X
 * */ 
function Person( name ) 
{
   this.name = name || '혁준';
}

Person.prototype.getName = function() 
{
    return this.name;
}


function Korean( name ) 
{
   // 부모의 모든 this 속성들만을 자식함수에 모두 복사( apply() )
    Person.apply( this, arguments );
}

var kor1 = new Korean( '지수' );
console.log( kor1.name );           // '지수'
console.log( kor1.getName() );      // this 속성이 아니므로 참조불가


/**
 *  상속 3 : 부모 생성자도 빌리고, prototype 도 지정하기
 *  - 부모의 this 속성들도 상속받고, 
 *  - 부모의 prototype 속성들도 상속받음.
*/
function Person( name ) 
{
   this.name = name || '지혁';
}
Person.prototype.getName = function() 
{
    return this.name;
}

function Korean( name ) 
{
    // 부모의 this 속성들 복사
    Person.apply( this, arguments );
}
// 부모의 prototype 속성들 복사
Korean.prototype = new Person();

var kor1 = new Korean( '지수' );
console.log( kor1.getName() );      // '지수'


/**
 *  상속 4 : 부모생성자 없이 프로토타입( __proto__ ) 공유 
 *  - 부모의 this 가 상속 X.  prototype 동작에 필요한 속성들을 자식이 선언해야 함.
 *  - 부모의 prototype 만 상속 O.
*/
function Person( name, age ) 
{
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function() 
{
    return this.name;
}
Person.prototype.getAge = function() 
{
    return this.age;
}

function Korean( name, age ) 
{
   this.name = name;
}
// 부모의 __proto__ 공유 연결
Korean.prototype = Person.prototype;

var kor1 = new Korean( '지수', 20 );
console.log( kor1.getName() );      // '지수' : prototype 동작에 필요한 속성을 자식에서 정의
console.log( kor1.getAge() );       // undefined
console.log( kor1.age );            // undefined


/**
 *  상속 5 : 객체 생성과 동시에 prototype 자동지정 : Object.create()
 *  - 객체 생성과 동시에 부모의 prototype 도 자동으로 지정됨.
*/

var person = 
{
    type : '인간', 
    getType : function() 
    {
        return this.type;
    }, 
    getName : function() 
    {
        return this.name;
    }
}

// 객체 생성과 동시에 자동으로 부모의 prototype 에 연결됨.
var john = Object.create( person );
// 필요한 속성 추가
john.name = '혁준';

console.log( john.getType() );
console.log( john.getName() );