import { defineComponent, onMounted } from 'vue';
import { NFlex, NScrollbar, useNotification } from "naive-ui";
import MusicList from "@/components/MusicList";
import GenreVersionManager from "@/components/GenreVersionManager";
import { selectedADir, updateAddVersionList, updateAssetDirs, updateGenreList, updateSelectedAssetDir, updateVersion } from "@/store/refs";
import MusicEdit from "@/components/MusicEdit";
import MusicSelectedTopRightToolbar from "@/components/MusicSelectedTopRightToolbar";
import CreateMusicButton from "@/components/CreateMusicButton";
import ImportChartButton from "@/components/ImportChartButton";
import ModManager from "@/components/ModManager";
import VersionInfo from "@/components/VersionInfo";

export default defineComponent({
  setup() {
    onMounted(updateGenreList)
    onMounted(updateAddVersionList)
    onMounted(updateSelectedAssetDir)
    onMounted(updateAssetDirs)
    onMounted(updateVersion)

    const notification = useNotification();

    onMounted(() => {
      addEventListener("unhandledrejection", (event) => {
        console.log(event)
        if (import.meta.env.DEV)
          notification.error({title: '未处理错误', content: event.reason?.error?.message || event.reason?.message});
      });
    })
  },
  render() {
    return <NFlex justify="center">
      <div class="grid cols-[40em_1fr] w-[min(90rem,100%)]">
        <div class="p-xy h-100vh">
          <MusicList/>
        </div>
        <NFlex vertical class="p-xy h-100vh" size="large" style={{background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 16px, rgba(255, 255, 255, 0.1) calc(100% - 16px), transparent 100%)'}}>
          <NFlex class="shrink-0">
            {selectedADir.value !== 'A000' && <>
              <GenreVersionManager type="genre"/>
              <GenreVersionManager type="version"/>
            </>}
            <ModManager/>

            <div class="grow-1"/>

            {selectedADir.value !== 'A000' && <>
              <MusicSelectedTopRightToolbar/>
              <CreateMusicButton/>
              <ImportChartButton/>
            </>}
            <VersionInfo/>
          </NFlex>
          <NScrollbar class="grow-1">
            <MusicEdit/>
          </NScrollbar>
        </NFlex>
      </div>
    </NFlex>;
  },
});
