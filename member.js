function skillsMember() 
{
    const members = [];

    function addMember(name, skill) {
        members.push({ name, skill });
    }

    function getMembers() {
        return members;
    }

    function findMemberByName(name) {
        return members.find(member => member.name === name);
    }

    return {
        addMember,
        getMembers,
        findMemberByName
    };
}