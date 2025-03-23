import {Link, Stack, useRouter} from "expo-router";
import {Button} from "react-native";
import {useActionData} from "@/hooks/contexts/useActionData";


interface ActionHeaderProps {
  title: string;
  code: string;
  isCodeBound: boolean | undefined;
}

const ActionHeader = ({title, code, isCodeBound}: ActionHeaderProps) => {

  const {setContextCode} = useActionData();
  const router = useRouter();

  return <Stack.Screen
    options={{
      title: title,
      headerBackTitle: "Wróć",
      headerRight: () => (
        <Link
          href={{
            pathname: "/home/search",
            params: {ean: code},
          }}
          asChild
        >
          <Button
            title='Przypisz'
            disabled={isCodeBound === undefined ? true : isCodeBound}
            onPress={() => setContextCode(code)}
          />
        </Link>
      ),
      headerLeft: () => (
        <Button
          title='Wróć'
          onPress={() => {
            router.back();
          }}
        />
      ),
    }}
  />
}
export default ActionHeader;