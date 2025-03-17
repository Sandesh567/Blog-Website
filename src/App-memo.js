import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}



function App() {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [isFakeDark, setIsFakeDark] = useState(false);

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    const handleAddPost = useCallback(function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }, [])

    function handleClearPosts() {
        setPosts([]);
    }

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    useEffect(
        function () {
            document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );

    const archiveOptions = useMemo(() => {
        return {
            show: false,
            title: `Post archive in addition to ${posts.length} main post`,
        };
    }, [posts.length]);

    return (
        <section>
            <button
                onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
                className="btn-fake-dark-mode"
            >
                {isFakeDark ? "☀️" : "🌙"}
            </button>

            <Header
                posts={searchedPosts}
                onClearPosts={handleClearPosts}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Main posts={searchedPosts} onAddPost={handleAddPost} />
            <Archive archiveOptions={archiveOptions} onAddPost={handleAddPost} />
            <Footer />
        </section>
    );
}



function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results posts={posts} />
                <SearchPosts
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}

function SearchPosts({ searchQuery, setSearchQuery }) {
    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
        />
    );
}

function Results({ posts }) {
    return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main({ posts, onAddPost }) {
    return (
        <main>
            <FormAddPost onAddPost={onAddPost} />
            <Posts posts={posts} />
        </main>
    );
}

