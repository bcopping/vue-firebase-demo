export const addNotifications = function (args) {

    const notification = `
        <div id="notifInner" class="notification ${args.type}">
            <button id="btnCancelNotification" class="delete"></button>
            <p><b>${args.title}</b> - ${args.string}</p>
        </div>
    `
    document.getElementById('notification').innerHTML = notification
    document.getElementById('notifInner').classList.add('animated', 'slideInDown')

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'btnCancelNotification') {
            notificationGone()
        }
    })

    function notificationGone() {
        document.getElementById('notifInner').classList.remove('slideInDown');
        document.getElementById('notifInner').classList.add('animated', 'fadeOutUp');
        setTimeout(function () {
            document.getElementById('notification').innerHTML = ''
        }, 1000)
    }

    //remove it..
    setTimeout(function () {
        notificationGone()
    }, 3000)

}
