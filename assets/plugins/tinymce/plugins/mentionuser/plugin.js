(function () {

    'use strict'

    tinymce.PluginManager.add('mentionuser', function (editor, url) {

        let usersIds = []

        // js str capitalize
        let strCapitalize = function (str) {

            let strLowerCase = str.toLowerCase()
            let arr = strLowerCase.split(' ');
            let result = [];

            arr.forEach(function (str, index) {

                if (index == 0) {
                    result = str.replace(/^\w/, (c) => c.toUpperCase())
                }

                if (index > 0) {
                    result += ' ' + str.replace(/^\w/, (c) => c.toUpperCase())
                }

            })

            return result;
        }

        // watch the user at update
        let watchUsersAtUpdate = function (spnTagsAt) {

            if (spnTagsAt.length == 0) {
                usersIds = []
            } else {

                let arr = []

                spnTagsAt.forEach(function (el, index) {
                    arr.push(el.dataset.id)
                })

                usersIds = arr
            }

            editor.execCallback('mention_users_selected', usersIds)

        }

        // format slug "@userLastname"
        let formatAtSlug = function (slug) {

            let arr = slug.split('-');
            let result;

            arr.forEach(function (str, index) {

                if (index == 0) {
                    result = str;
                }

                if (index > 0) {
                    result += strCapitalize(str)
                }
            })

            return result;
        }

        // list mention_users param end filter users
        let getUsers = function (pattern) {

            let users = editor.getParam('mention_users');

            return users.filter(function (user) {
                let slug = user.slug.toLowerCase()
                let search = pattern.toLowerCase()
                return slug.includes(search)
            })
        }

        // lead plugin style.css file
        let loadStyleshet = function () {
            let fileref = document.createElement("link")
            fileref.rel = "stylesheet"
            fileref.type = "text/css"
            fileref.href = `${url}/style.css?v=${new Date().getTime()}`
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }

        editor.on('keyup', function (e) {

            let keycode = e.keyCode;
            let el = e.target;

            let spnTagsAt = el.querySelectorAll('span.mention.tag.at')

            if (keycode === 8 || keycode === 46) {

                watchUsersAtUpdate(spnTagsAt)

            }
        });

        editor.ui.registry.addAutocompleter('mentionuser', {
            ch: '@',
            minChars: 1,
            columns: 1,
            highlightOn: ['mention_slug'],
            fetch: function (pattern) {
                return new tinymce.util.Promise(function (resolve) {

                    let results = getUsers(pattern).map(function (user) {

                        return {
                            type: 'cardmenuitem',
                            value: user.id + "|" + user.slug + "|" + user.name + "|" + user.role.title,
                            items: [
                                {
                                    type: 'cardimage',
                                    src: user.avatar + '?s=200&d=mp&r=x',
                                    classes: ['tox-mention__avatar'],
                                },
                                {
                                    type: 'cardcontainer',
                                    direction: 'vertical',
                                    items: [
                                        {
                                            type: 'cardtext',
                                            text: `@${formatAtSlug(user.slug)}`,
                                            name: 'mention_slug',
                                            classes: ['tox-mention__name'],
                                        },
                                        {
                                            type: 'cardtext',
                                            text: strCapitalize(user.role.title),
                                            name: 'mention_role',
                                            classes: ['tox-mention__role'],
                                        },
                                    ]
                                }
                            ]
                        }
                    });

                    resolve(results)

                });
            },
            onAction: function (autocompleteApi, rng, value) {

                let parts = value.split('|')

                let id = parts[0]
                let slug = parts[1]
                let name = parts[2]
                let role = parts[3]

                usersIds.push(id)

                let content = `<span class="mention tag at" title="${strCapitalize(name)} (${strCapitalize(role)})" contenteditable="false" data-id="${id}">@${formatAtSlug(slug)}</span>`

                editor.selection.setRng(rng)
                editor.insertContent(content)
                editor.execCallback('mention_users_selected', usersIds)

                autocompleteApi.hide()
            }
        });

        loadStyleshet()

        return {
            getMetadata: function () {
                return {
                    name: 'Mention Uset At',
                    url: 'https://example.com/docs/customplugin'
                }
            }
        }
    })

})()
