import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type LabelProps = {
    title: string
    hasContent?: boolean
    content?: string
    type?: "header" | "footer" | "body" | "single"
}

export default function Label({
    title, hasContent, content, type = "body"
}: LabelProps) {
    return (
        <ThemedView style={[
            styles.wrapper,
            type === "header" || type === "single" ? styles.header : undefined,
            type === "footer" || type === "single" ? styles.footer : undefined,
        ]}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            {hasContent && <ThemedText style={styles.text}>{content}</ThemedText>}
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        height: 80,
        textAlignVertical: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        alignContent: 'space-between',
    },
    title: {
        flex: 1
    },
    text: {
        flex: 1
    },
    header: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomWidth: 0,
    },
    footer: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomWidth: 0,
    },
})