import "@/src/app/index.css"
import type { AppProps } from "next/app"
import { Provider } from "effector-react/scope"
import { useScope } from "../app/lib"
import { Layout } from "../widgets"

function App({ Component, pageProps, router }: AppProps) {
    const scope = useScope(pageProps.initialState)

    return (
        <Provider value={scope}>
            <Layout>
                <Component {...pageProps} router={router} />
            </Layout>
        </Provider>
    )
}

export default App
