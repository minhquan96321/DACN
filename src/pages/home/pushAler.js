export function initPushAlert() {
  (window.pushalertbyiw = window.pushalertbyiw || []).push([
    "onReady",
    onPAReady,
  ]);

  function onPAReady() {
    console.log("PushAlert Ready");
    console.log("Subscription ID:", PushAlertCo.subs_id);
    return {
      isSubscribed: !!PushAlertCo.subs_id,
      subsId: PushAlertCo.subs_id,
    };
  }
}

export function subscribeUser() {
  if (window.pushalertbyiw) {
    window.pushalertbyiw.push([
      "subscribe",
      {
        successCallback: function (data) {
          console.log("Subscribe success:", data);
        },
        errorCallback: function (data) {
          console.log("Subscribe error:", data);
        },
      },
    ]);
  }
}

export function unsubscribeUser() {
  if (window.pushalertbyiw) {
    window.pushalertbyiw.push([
      "unsubscribe",
      {
        successCallback: function (data) {
          console.log("Unsubscribe success:", data);
        },
        errorCallback: function (data) {
          console.log("Unsubscribe error:", data);
        },
      },
    ]);
  }
}
