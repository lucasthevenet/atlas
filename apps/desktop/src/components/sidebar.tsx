import {
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music2,
  PlayCircle,
  Radio,
  User,
} from "lucide-react";

import { Button } from "@acme/ui/button";
import { ScrollArea } from "@acme/ui/scroll-area";
import { cn } from "@acme/ui/utils";

import { type Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Listen Now
            </Button>
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Browse
            </Button>
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <Radio className="mr-2 h-4 w-4" />
              Radio
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Playlists
            </Button>
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <Music2 className="mr-2 h-4 w-4" />
              Songs
            </Button>
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              Made for You
            </Button>
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <Mic2 className="mr-2 h-4 w-4" />
              Artists
            </Button>
            <Button
              variant="tertiary"
              color="gray"
              size="sm"
              className="w-full justify-start"
            >
              <Library className="mr-2 h-4 w-4" />
              Albums
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-2">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist) => (
                <Button
                  variant="tertiary"
                  color="gray"
                  size="sm"
                  className="w-full justify-start font-normal"
                  key={playlist}
                >
                  <ListMusic className="mr-2 h-4 w-4" />
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
