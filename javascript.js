(function () {
    'use strict';

    // deklaracja zmiennych
        let przeciaganyElement;
        let rozpocznijPrzeciaganieElementu; 
        let przeciaganieElementu;
        let zakonczPrzeciaganieElementu;
        let punktX;
        let punktY;
        let pozycjaX;
        let pozycjaY;
        let stworzNotatke;
        let i = 0;
        let czasUtworzeniaNotatki = new Date();
    
    // definicja funkcji potrzebne do wykonania przeciagniecia elementu
    rozpocznijPrzeciaganieElementu = function (ev) {

        // zmienna potrzebna do przeciagania calego elementu notatka
        let boundingClientRect;

        //zabezpieczenie, gdyby element uchwyt nie zostal utworzony
        if(ev.target.className.indexOf('uchwyt') === -1)
        {
           return;
        }
       
        //this odwoluje sie do elementu notatka, ktory w danej chwili jest obslugiwany
        przeciaganyElement = this;

        //przypisanie faktycznej pozycji calego elementu
        boundingClientRect = przeciaganyElement.getBoundingClientRect();

        //zapmietanie pozycji elementu w momencie rozpoczecia przesuwania
        punktX = boundingClientRect.left - ev.clientX;
        punktY = boundingClientRect.top - ev.clientY;
    };
      //funcja obslugujaca przesuwanie elementu
      przeciaganieElementu =  function (ev)
      {
          // zabezpieczenie na wypadek gdyby element nie istnial
          if(!przeciaganyElement)
          {
              return;
          }
          //zmiana pozycji elementu wraz z ruchem myszki
           pozycjaX = ev.clientX + punktX;
           pozycjaY = ev.clientY + punktY;

           //zabezpieczenie, aby element nie wychodzil poza lewy gorny rog, wychodzenie poza inne rogi, sprawia rozszerzanie sie strony
           if(pozycjaX < 0)
           {
               pozycjaX = 0;
           }
           if(pozycjaY < 0)
           {
               pozycjaY = 0;
           }

          // przesuwanie elementu za pomoca funckji transform klasy style; wykorzystanie wlasciwosci translateX i translateY
          przeciaganyElement.style.transform = "translateX(" + pozycjaX + "px) translateY(" + pozycjaY + "px)";

        

      };
   
      //funkcja konczaca przeciaganie elementu; zerowanie zmiennych
      zakonczPrzeciaganieElementu = function() {
       przeciaganyElement = null;
       punktX = null;
       punktY = null;

      };

      // funkcja tworzaca notatke
      stworzNotatke = function() {
        //licznik numeru notatki  
        i++;
        //utworzenie dwoch divow
        var notatkaEl = document.createElement('div');
        var uchwytEl = document.createElement('div');
        //utworzenie textarei, do ktorej mozna wpisywac tekst
        var poleTekstoweEl = document.createElement('textarea');
        
        //wykorzystanie wlasciwosci innerHtml w celu dopisania tekstu oraz czasu utworzenia notatki
        uchwytEl.innerHTML += "Notatka nr: "+ i +"<br>";
        uchwytEl.innerHTML += czasUtworzeniaNotatki.getDate()+"/"+czasUtworzeniaNotatki.getMonth()+1+"/"+czasUtworzeniaNotatki.getFullYear()+" "+ czasUtworzeniaNotatki.getHours()+":"+ czasUtworzeniaNotatki.getMinutes();

        //dodanie styli do divow oraz textrae
        notatkaEl.classList.add('notatka');
        uchwytEl.classList.add('uchwyt');
        poleTekstoweEl.classList.add('textarea');

        //utworzenie calego elementu za pomoca metody appendChild
        notatkaEl.appendChild(uchwytEl);
        notatkaEl.appendChild(poleTekstoweEl);

        //nasluchiwanie na klikniecie przycisku myszy, ktory powoduje rozpoczecie przesuwania elementu
        notatkaEl.addEventListener('mousedown', rozpocznijPrzeciaganieElementu, false);

        //dodanie calego elementu do body w html
        document.body.appendChild(notatkaEl);

 

      };

      
     //stworzenie przycisku, za pomoca ktorego mozna dodawac kolejne notatki
     var przyciskDodajNotatkeEl = document.querySelector('.przyciskDodawaniaNotatki');
      przyciskDodajNotatkeEl.addEventListener('click',stworzNotatke, false);
      
       //nasluchiwanie kolejnych ruchow myszka, oraz zwolnienia przycisku myszki 
      document.addEventListener('mousemove', przeciaganieElementu, false);
      document.addEventListener('mouseup', zakonczPrzeciaganieElementu, false);
      
    

})();