<template>
  <div class="schedulers">
    <div class="column-1">
      <DxScheduler
        time-zone="America/Los_Angeles"
        :data-source="store1"
        :current-date="currentDate"
        :views="views"
        :height="600"
        :start-day-hour="9"
        :end-day-hour="19"
        :remote-filtering="true"
        current-view="day"
        date-serialization-format="yyyy-MM-ddTHH:mm:ssZ"
        text-expr="Text"
        description-expr="Description"
        start-date-expr="StartDate"
        end-date-expr="EndDate"
        all-day-expr="AllDay"
      />
    </div>
    <div class="column-2">
      <DxScheduler
        time-zone="America/Los_Angeles"
        :data-source="store2"
        :current-date="currentDate"
        :views="views"
        :height="600"
        :start-day-hour="9"
        :end-day-hour="19"
        :remote-filtering="true"
        current-view="day"
        date-serialization-format="yyyy-MM-ddTHH:mm:ssZ"
        text-expr="Text"
        start-date-expr="StartDate"
        end-date-expr="EndDate"
        all-day-expr="AllDay"
      />
    </div>
  </div>
</template>
<script>
import DxScheduler from 'devextreme-vue/scheduler';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

const BASE_PATH = 'https://js.devexpress.com/Demos/NetCore/';
const url = `${BASE_PATH}api/SchedulerSignalR`;
const createStore = () => AspNetData.createStore({
  key: 'AppointmentId',
  loadUrl: url,
  insertUrl: url,
  updateUrl: url,
  deleteUrl: url,
  onBeforeSend(method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});
const store1 = createStore();
const store2 = createStore();

const connection = new HubConnectionBuilder()
  .withUrl(`${BASE_PATH}schedulerSignalRHub`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

connection
  .start()
  .then(() => {
    connection.on('update', (key, data) => {
      store1.push([{ type: 'update', key, data }]);
      store2.push([{ type: 'update', key, data }]);
    });

    connection.on('insert', (data) => {
      store1.push([{ type: 'insert', data }]);
      store2.push([{ type: 'insert', data }]);
    });

    connection.on('remove', (key) => {
      store1.push([{ type: 'remove', key }]);
      store2.push([{ type: 'remove', key }]);
    });
  });

export default {
  components: {
    DxScheduler,
  },
  data() {
    return {
      views: ['day', 'workWeek'],
      currentDate: new Date(2021, 3, 27),
      store1,
      store2,
    };
  },
};
</script>
<style scoped>
.schedulers {
  display: flex;
}

.column-1 {
  padding-right: 5px;
}

.column-2 {
  padding-left: 5px;
}

.dx-scheduler-small .dx-scheduler-view-switcher.dx-tabs {
  display: table;
}
</style>
