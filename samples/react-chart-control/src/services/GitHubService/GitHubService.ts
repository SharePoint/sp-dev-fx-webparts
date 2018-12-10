import { IGitHubService, IGitHubContributor } from "./IGitHubService.types";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class GitHubService implements IGitHubService {
  public getContributors(context: IWebPartContext, repoOwner: string, repo: string): Promise<IGitHubContributor[]> {
    // note that for simplicity, we don't escape strings or verify that they are valid.
    const requestUrl: string = `https://api.github.com/repos/${repoOwner}/${repo}/contributors`;

    // call the GitHub API
    return context.httpClient.fetch(requestUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((contributors: IGitHubContributor[]): IGitHubContributor[] => {
        return contributors;
      });
  }
}
