import "./home.scss";

function Home() {
  return (
      <div className="block">
        <div className="text">
        Привет, это тестовое приложение на Expressjs + Reactjs. На данный 
        момент количество функционала в нем весьма ограничено.
        Все, что ты можешь сделать - воспользоваться калькулятором,
         чтобы выполнить какие-либо обычные функции.
        Также, данное приложение имеет возможность авторизации на
         основе jwt токенов и, если ты авторизирован,
        просматривать историю вычислений.
        </div>
      </div>
  );
}

export default Home;