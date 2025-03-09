import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";


function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}



function App() {

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    const [isFakeDark, setIsFakeDark] = useState(false);

    useEffect(
        function () {
            document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );

    return (
        //2)PROVIDE VALUE TO CHILD COMPONENTS
        <section>
            <button
                onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
                className="btn-fake-dark-mode"
            >
                {isFakeDark ? "☀️" : "🌙"}
            </button>

            <PostProvider>
                <Header />
                <Main />
                <Archive />
                <Footer />
            </PostProvider>
        </section>
    );
}

export default App;