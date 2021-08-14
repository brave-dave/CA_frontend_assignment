import { Box } from "@material-ui/core";
import CharacterCard from "../../cards/CharacterCard";
import usePageData, {
  isPageDataLoading,
  isPageDataNotFound,
} from "../../hooks/usePageData";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";

export default function CharactersListPage() {
  const pageData = usePageData({ currentPage: 1 });

  if (isPageDataLoading(pageData)) return <LoadingPage />;
  if (isPageDataNotFound(pageData)) return <ErrorPage />;

  const { content } = pageData;

  return (
    <Box>
      {content.map((props) => (
        <CharacterCard key={props.id} {...props} />
      ))}
    </Box>
  );
}
