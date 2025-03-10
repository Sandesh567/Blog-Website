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

            {/* <PostProvider>
                <Header />
                <Main />
                <Archive />
                <Footer />
            </PostProvider> */}
        </section>
    );
}


function Header() {
    //3) CONSUMING THE CONTEXT VALUE
    const { onClearPosts } = usePosts();
    return (

        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results />
                <SearchPosts />
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}

function SearchPosts() {
    const { searchQuery, setSearchQuery } = usePosts();
    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
        />
    );
}

export default App;