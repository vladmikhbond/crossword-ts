type Dictionary = {
    [topic: string]: string;
};

/**
 * Розділи, назви яких закінчуються на '_', будуть регістронезалежними.
 */  
export const data: Dictionary = {
    JavaScript_: 
    `transpiler - перекладач з нової версії мови на стару версію
    polyphile - бібліотека, яка додає функції, відсутні у цільовій версії стандарту
    typeof - Операція визначення типу
    number - числовий тип (як його повертає typeof)
    string - тип рядків (як його повертає typeof)
    boolean - логічний тип (як його повертає typeof)
    Infinity - число "нескінченність"
    bigint - тип довгих чисел (як його повертає typeof)
    true - правдиве логічне значення
    false - неправдиве логічне значення
    null - тип, який населяє єдине значення null
    undefined - тип, який населяє єдине значення undefined
    while - цикл з передумовою
    do-while - цикл з постумовою 
    for-in - цикл по іменам властивостей (назву пишіть з дефісом)
    function - команда, яка створює функціональний об'єкт
    return - команда, яка повертає керування з функції
    console - стандартний об'єкт, який має методи log() і error()
    Math - стандартний об'єкт, який має математичні методи
    property - пара "ключ: значення", притаманна об'єктам
    Object - конструктор об'єктів
    method - функція, що належить об'єкту
    assign - метод об'єкту Object, що створює поверхневу копію
    accessor - метод доступу
    Array - конструктор масиву
    array - об'єкт, що є колекцією властивостей із цілими ключами: 0, 1, 2, . . . 
    length - чисельна властивість масиву, що на одиницю більше від максимального індексу масиву
    pop - метод, що видаляє елемент з кінця масиву
    push - метод, що додає елемент в кінець масиву
    shift - метод, що додає елемент в початок масиву
    unshift - метод, що видаляє елемент з початку масиву
    slice - метод, що копіює ділянку масиву
    splice - метод, який видаляє і додає елементи у масив
    reverse - обертає масив так, що перший елемент стає останнім і навпаки
    concat - метод, який з'єднує масиви
    indexOf - метод, який повертає індекс першого входження підмасиву в масив
    reference - типи (types), які для зберігання своїх значень потребують двох ділянок пам'яті
    value - типи (types), які для зберігання своїх значень потребують однієї ділянки пам'яті
    IEEE-754 - міжнародний стандарт, за яким дійсні числа зберігаються в пам'яті
    isFinite - функція, що відрізняє числа Infinity від інших чисел
    isNaN - функція, що відрізняє числа NaN від інших чисел
    Number - функція для явного перетворення інших значень в числові
    toString - метод для перетворення будь-якого значення в рядок
    toFixed - метод для перетворення значення на рядок із округленням
    Unicode - стандарт кодування рядків в програмах на JS
    charAt - метод рядка, що повертає символ на заданій позиції
    toLowerCase - метод рядка, що зводить його до нижнього регістру
    toUpperCase - метод рядка, що зводить його до верхнього регістру
    indexOf - метод, що виконує пошук підрядка в рядку
    substr - метод, що виділяє підрядок з рядку 
    localeCompare - метод, що порівнює рядки за абеткою незалежно від регістру символів
    symbol - тип символів
    Symbol - функція, яка повертає унікальний символ
    for - метод об'єкту Symbol, що повертає символ із заданим ім'ям
    keyFor - метод об'єкту Symbol, що повертає ім'я заданого символу
    throw - команда, що створює виняток
    Error - конструктор винятку
    catch - блок, що містить обробку помилки
    finally - блок гарантованого виконання коду
    spread - оператор, який позначається трьома крапками
    arguments - псевдомасив аргументів функції
    name - властивість функції, зберігає її ім'я у вигляді рядка
    call - метод функції, який дозволяє встановити бажане значення контексту this
    this - контекст функції
    iterator - об'єкт, що забезпечує проходження елементів послідовності
    next - метод ітератора, який повертає чергове значення і можливість продовження ітерації 
    for-of - цикл по значенням властивостей (назву пишіть з дефісом)
    yield - слово, що зустрічається виключно у функціях-генераторах
    prototype - посилання на прототип (властивість функції)
    __proto__ - посилання на прототип (властивість об'єкту)
    create - метод Object, який створює об'єкт із заданим прототипом
    constructor - посилання на конструктор, що створив об'єкт (властивість об'єкту)`,
     
    Python_: 
    `Guido - ім'я атора мови Python
    PyCharm - професійна IDE компанії JetBrains
    int - тип цілих чисел
    float - тип дійсних чисел
    complex - тип комплексних чисел
    str - тип рядків
    bool - логічний тип
    UTF-8 - стандарт кодування символів у Python 3 
    type - функція, що повертає тип заданого значення
    elif - необов'язкова частина команди if
    PEP8 - документ, що описує стиль кодування мовою Python
    True - правдиве значення логічного типу
    False - неправдиве значення логічного типу
    and - операція логічного множення
    or - операція логічного складання
    not - операція заперечення
    while - цикл з передумовою
    else - необов'язкова частина команди while
    for - цикл по елементам послідовності
    range - функція, що генерує арифметичну прогресію
    def - команда, що створює функціональний об'єкт
    None - пусте значення
    return - команда, яка повертає керування з функції
    lambda - ключове слово, яким починається функціональний вираз
    scope - область видимості (англ.)
    built-in - найбільш загальна область видимості (згідно із LEGB Rule)
    local - найменш загальна область видимості (згідно із LEGB Rule)
    global - ключове слово, що відзначає імена глобальних об'єктів
    nonlocal - ключове слово, що відзначає імена нелокальних об'єктів`,

    EuroCapitals:
    `Відень - Австрія
    Брюссель - Бельгія
    Амстердам - Нідерланди
    Берлін - Німеччина
    Париж - Франція
    Берн - Швейцарія
    Тирана - Албанія
    Андорра-ла-Велья - Андорра
    Сараєво - Боснія і Герцеговина
    Афіни - Греція
    Мадрид - Іспанія
    Рим - Італія
    Скоп'є - Македонія
    Валлетта - Мальта
    Лісабон - Португалія
    Белград - Сербія
    Любляна - Словенія
    Загреб - Хорватія
    Подгориця - Чорногорія
    Лондон - Великобри
    Копенгаген - Данія
    Таллінн - Естонія
    Дублін - Ірландія
    Рейк'явік - Ісландія
    Рига - Латвія
    Вільнюс - Литва
    Осло - Норвегія
    Гельсінкі - Фінляндія
    Стокгольм - Швеція
    Мінськ - Білорусь
    Софія - Болгарія
    Кишинів - Молдова
    Варшава - Польща
    Бухарест - Румунія
    Братислава - Словакія
    Будапешт - Угорщина
    Київ - Україна
    Прага - Чехія`,
    

    'Часи і дні':
    `січень - январь
    лютий - февраль
    березень - март
    квітень - апрель
    травень - май
    червень - июнь
    липень - июль
    серпень - август
    вересень - сентябрь
    жовтень - октябрь
    листопад - ноябрь
    грудень - декабрь
    понеділок - понедельник
    вівторок - вторник
    середа - среда
    четвер - четверг
    п'ятниця - пятница
    субота - суббота
    неділя - воскресенье
    доба - сутки
    тиждень - неделя
    місяць - месяц
    рік - год
    півріччя - полугодие
    хвилина - минута
    година - час
    час - время
    століття - век
    ера - эра
    епоха - эпоха
    відпустка - отпуск
    ранок - утро
    різдво - рождество
    рівнодення - равноденствие
    свято - праздник
    схід - восход
    опівдні - в полдень
    опівночі - в полночь
    світанок - рассвет
    середньовіччя - средневековье
    годинник - часы
    вічність - вечность
    термін - срок
    нещодавно - недавно
    старовинний - старинный
    старий - старик
    напередодні - намедни`,

    'Прапори':
    `Андорра - https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/1280px-Flag_of_Andorra.svg.png
    Білорусь - https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.svg/1920px-Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.svg.png
    Бельгія - https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/1024px-Flag_of_Belgium.svg.png
    Болгарія - https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png
    Боснія_і_Герцеговина - https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bosnia_and_Herzegovina.svg/1920px-Flag_of_Bosnia_and_Herzegovina.svg.png
    Великобританія - https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1920px-Flag_of_the_United_Kingdom_%283-5%29.svg.png
    Греція - https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/1280px-Flag_of_Greece.svg.png
    Данія - https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/1280px-Flag_of_Denmark.svg.png
    Естонія - https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/1280px-Flag_of_Estonia.svg.png
    Ірландія - https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1920px-Flag_of_Ireland.svg.png
    Ісландія - https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/1280px-Flag_of_Iceland.svg.png
    Іспанія - https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png
    Італія - https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png
    Латвія - https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/1920px-Flag_of_Latvia.svg.png
    Литва - https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/1920px-Flag_of_Lithuania.svg.png
    Мальта - https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/1280px-Flag_of_Malta.svg.png`,

    'Викладачі 1курс':
    `ДударЗВ - https://software.nure.ua/wp-content/uploads/2021/04/dudar-zoya-volodimirivna.png
    ЄрохінAЛ - https://software.nure.ua/wp-content/uploads/2021/04/yerohin-andrij-leonidovich.png
    БілоусНВ - https://software.nure.ua/wp-content/uploads/2021/04/bilous-nataliya-valentinivna.png
    БондарєвВМ - https://software.nure.ua/wp-content/uploads/2021/04/bondaryev-volodimir-mihajlovich.png
    ЛитвинOГ - https://nure.ua/wp-content/uploads/Employees_photo/LitvinAG-135x180.jpg
    МанчинськаНБ - https://nure.ua/wp-content/uploads/Employees_photo/Manchinskaya.jpg

    ТерещенкоГЮ - https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=7eiV2qMAAAAJ&citpid=1
    СаманцовОО - https://software.nure.ua/wp-content/uploads/2020/12/Samanczov_Oleksandr-Copy.jpg
    ЧерепановаЮЮ - https://software.nure.ua/wp-content/uploads/2021/04/cherepanova.jpg
    ЗибінаКВ - https://software.nure.ua/wp-content/uploads/2020/12/Zybina_KV.jpg
    АгекянІА - https://software.nure.ua/wp-content/uploads/2020/12/AgekianI.jpg
    

    `
};
    
export const topics = Object.keys(data);
