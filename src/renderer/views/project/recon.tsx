import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import SubFinderJob from './jobs/subfinder';
import LiveSubdomainsJob from './jobs/liveSubDomains';
import HttpxScreensJob from './jobs/httpxScreens';
import WaybackurlsArchiveJob from './jobs/waybackurlsArchive';
import WaybackurlsJsJob from './jobs/waybackurlsJs';
import WaybackurlsParameterJob from './jobs/waybackurlsParameter';
import { ProjectDetails } from '../../types';

export default function Recon() {
  const [details, setDetails] = useState<ProjectDetails>();
  const { projectSlug } = useParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDetails = async () => {
    const res = await window.electron.ipcRenderer.invoke(
      'get-project-detailss',
      projectSlug,
    );
    setDetails(res);
  };
  useEffect(() => {
    getDetails();
  }, [getDetails]);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Initiate Recon Attacks</h1>
      <div>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Subdomains</CardTitle>
              <CardDescription>
                Enumurate all subdomains of your target.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">
                    Last Run <span>{details.recon?.subfinder?.date}</span>
                  </h1>
                </div>
              )}
              <SubFinderJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Find live Subdomains</CardTitle>
              <CardDescription>
                Check which subdomains are live ?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">
                    Last Run <span>{details.recon?.liveDomains?.date}</span>
                  </h1>
                </div>
              )}
              <LiveSubdomainsJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Screenshots</CardTitle>
              <CardDescription>
                See what is your target look like ?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">
                    Last Run <span>{details.recon?.screens?.date}</span>
                  </h1>
                </div>
              )}
              <HttpxScreensJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Archive</CardTitle>
              <CardDescription>
                Crawl all the URLs of your target from the wayback machine.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">Last Run</h1>
                </div>
              )}
              <WaybackurlsArchiveJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Js Files</CardTitle>
              <CardDescription>Get all the js.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">Last Run</h1>
                </div>
              )}
              <WaybackurlsJsJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Parameters</CardTitle>
              <CardDescription>Get all the Parameters.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">
                    Last Run <span>{details.recon?.params?.date}</span>
                  </h1>
                </div>
              )}
              <WaybackurlsParameterJob />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
