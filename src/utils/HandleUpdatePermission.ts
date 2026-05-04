import { PrismaService } from '@database/PrismaService';
import { AdminPermission } from '@prisma/client';

class HandleUpdatePermission {
  async update(prisma: PrismaService, id: number, permissions: AdminPermission[]): Promise<void> {
    const permissionsFound: AdminPermission[] = await prisma.adminPermission.findMany({
      where: { name: { in: permissions as any } },
    });

    await prisma.user.update({ where: { id }, data: { adminPermissions: { set: [] } } });

    await prisma.user.update({
      where: { id },
      data: { adminPermissions: { connect: permissionsFound } },
    });
  }
}

export default new HandleUpdatePermission();
